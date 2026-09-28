'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useApp } from './providers';
import { site } from '@/lib/data';

export function CheckoutPage() {
  const { cart, subtotal, clearCart, saveOrder, toast } = useApp();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  const delivery = subtotal >= 1500 ? 0 : 199;
  const discount = subtotal >= 1500 ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal + delivery - discount;

  async function placeOrder() {
    setError('');

    if (!form.name || !form.phone || !form.address || !cart.length) {
      setError(
        'Please complete your name, phone and delivery address.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: form,
          items: cart.map(({ id, quantity }) => ({
            id,
            quantity,
          })),
          payment: 'cod',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Order failed');
      }

      saveOrder({
        ...data.order,
        items: cart,
      });

      clearCart();
      toast('Order confirmed!');

      router.push(`/orders?success=${data.order.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Order failed');
      toast('Could not place order', 'error');
    } finally {
      setLoading(false);
    }
  }

  // Empty cart
  if (!cart.length) {
    return (
      <main>
        <div className="empty-state">
          <ShoppingBag size={48} />

          <h1>Your bag is empty.</h1>

          <Link href="/menu" className="primary-btn">
            Browse menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Checkout top bar */}
      <div className="checkout-bar">
        <Link href="/cart">
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>

        <b>{site.name}</b>

        <span>
          <ShieldCheck size={18} />
          Secure checkout
        </span>
      </div>

      <div className="checkout-layout">
        {/* ================= LEFT ================= */}
        <section>
          <span className="eyebrow">Checkout</span>

          <h1>Let’s send it your way.</h1>

          {/* Delivery Details */}
          <div className="checkout-card">
            <div className="card-head">
              <MapPin size={24} />

              <div>
                <h2>Delivery details</h2>
                <p>{site.location}</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Name

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Your full name"
                />
              </label>

              <label>
                Phone

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  placeholder="03XX XXXXXXX"
                />
              </label>

              <label className="full">
                Address

                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  placeholder="House / street / area"
                />
              </label>

              <label className="full">
                Note

                <textarea
                  value={form.note}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      note: e.target.value,
                    })
                  }
                  placeholder="Any special instructions? (optional)"
                  rows={4}
                />
              </label>
            </div>
          </div>

          {/* Payment */}
          <div className="checkout-card">
            <div className="payment">
              <span>₨</span>

              <div>
                <b>Cash on delivery</b>
                <small>Pay when your order arrives.</small>
              </div>

              <Check size={20} />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {/* ================= PLACE ORDER ================= */}
          <button
            type="button"
            className="primary-btn place"
            disabled={loading}
            onClick={placeOrder}
          >
            {loading ? (
              <span>Sending…</span>
            ) : (
              <>
                <span>
                  Place order · Rs. {total.toLocaleString()}
                </span>

                <ArrowRight size={20} />
              </>
            )}
          </button>
        </section>

        {/* ================= RIGHT / SUMMARY ================= */}
        <aside className="summary">
          <span className="eyebrow">Order</span>

          <h2>
            {cart.length} item{cart.length > 1 ? 's' : ''}
          </h2>

          {/* Cart Items */}
          {cart.map((item) => (
            <div className="mini-line" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <span>
                {item.quantity}× {item.name}
              </span>

              <b>
                Rs.{' '}
                {(item.price * item.quantity).toLocaleString()}
              </b>
            </div>
          ))}

          <hr />

          {/* Subtotal */}
          <div>
            <span>Subtotal</span>

            <b>
              Rs. {subtotal.toLocaleString()}
            </b>
          </div>

          {/* Delivery */}
          <div>
            <span>Delivery</span>

            <b>
              {delivery ? 'Rs. 199' : 'FREE'}
            </b>
          </div>

          {/* Discount */}
          <div>
            <span>Discount</span>

            <b>
              − Rs. {discount.toLocaleString()}
            </b>
          </div>

          {/* Total */}
          <div className="total">
            <span>Total</span>

            <b>
              Rs. {total.toLocaleString()}
            </b>
          </div>
        </aside>
      </div>
    </main>
  );
}