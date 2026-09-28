import { NextResponse } from 'next/server';
import { z } from 'zod';
import { products } from '@/lib/data';

const phoneSchema = z
  .string()
  .trim()
  .min(7, 'Phone number is too short.')
  .max(25, 'Phone number is too long.')
  .regex(
    /^[+()\d\s-]+$/,
    'Please enter a valid phone number.'
  );

const orderSchema = z.object({
  customer: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name is too short.')
      .max(80, 'Name is too long.'),

    phone: phoneSchema,

    address: z
      .string()
      .trim()
      .min(8, 'Delivery address is too short.')
      .max(240, 'Delivery address is too long.'),

    note: z
      .string()
      .trim()
      .max(300, 'Delivery note is too long.')
      .optional()
      .default(''),
  }),

  items: z
    .array(
      z.object({
        id: z
          .string()
          .trim()
          .min(1, 'Invalid product ID.'),

        // Handles both:
        // quantity: 2
        // quantity: "2"
        quantity: z.coerce
          .number()
          .int('Quantity must be a whole number.')
          .min(1, 'Quantity must be at least 1.')
          .max(20, 'Maximum quantity is 20.'),
      })
    )
    .min(1, 'Your cart is empty.')
    .max(20, 'Too many different products.'),

  // Your current checkout uses COD.
  payment: z.literal('cod'),
});

export async function POST(request: Request) {
  try {
    /* -----------------------------------------
       Read request body
    ----------------------------------------- */

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid request body.',
        },
        { status: 400 }
      );
    }

    console.log('ORDER REQUEST:', body);

    /* -----------------------------------------
       Validate request
    ----------------------------------------- */

    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      console.error(
        'ORDER VALIDATION ERROR:',
        parsed.error.flatten()
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            parsed.error.issues[0]?.message ||
            'Please check your delivery details and order items.',
        },
        { status: 400 }
      );
    }

    const { customer, items, payment } = parsed.data;

    /* -----------------------------------------
       Prevent duplicate products
    ----------------------------------------- */

    const uniqueIds = new Set(
      items.map((item) => item.id)
    );

    if (uniqueIds.size !== items.length) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Your cart contains a duplicated product.',
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------
       Resolve products from server data
       Never trust client prices
    ----------------------------------------- */

    const lineItems = [];

    for (const line of items) {
      const product = products.find(
        (item) => item.id === line.id
      );

      if (!product) {
        return NextResponse.json(
          {
            ok: false,
            message:
              'One of the selected products is no longer available.',
          },
          { status: 400 }
        );
      }

      lineItems.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        quantity: line.quantity,
        unitPrice: product.price,
        lineTotal:
          product.price * line.quantity,
      });
    }

    /* -----------------------------------------
       Calculate pricing on server
    ----------------------------------------- */

    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const FREE_DELIVERY_THRESHOLD = 1500;
    const DELIVERY_FEE = 199;
    const DISCOUNT_RATE = 0.15;

    const delivery =
      subtotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : DELIVERY_FEE;

    const discount =
      subtotal >= FREE_DELIVERY_THRESHOLD
        ? Math.round(
            subtotal * DISCOUNT_RATE
          )
        : 0;

    const total = Math.max(
      0,
      subtotal + delivery - discount
    );

    /* -----------------------------------------
       Create order
    ----------------------------------------- */

    const order = {
      id: `EB-${Date.now()
        .toString(36)
        .toUpperCase()}`,

      status: 'confirmed' as const,

      createdAt:
        new Date().toISOString(),

      eta: '20–35 min',

      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        note: customer.note || '',
      },

      payment,

      currency: 'PKR',

      pricing: {
        subtotal,
        delivery,
        discount,
        total,
      },

      total,

      items: lineItems,
    };

    console.log(
      'ORDER CREATED:',
      order.id
    );

    return NextResponse.json(
      {
        ok: true,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      'ORDER_API_ERROR:',
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          'Something went wrong while placing your order. Please try again.',
      },
      { status: 500 }
    );
  }
}