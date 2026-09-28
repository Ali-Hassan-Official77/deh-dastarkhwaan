
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';

import { useApp } from './providers';
import { SiteHeader, MobileNav } from './site-header';

export function CartPage() {
  const router = useRouter();

  const {
    cart,
    subtotal,
    setQuantity,
    removeFromCart,
  } = useApp();

  const delivery = subtotal >= 1500 ? 0 : 199;

  const discount =
    subtotal >= 1500
      ? Math.round(subtotal * 0.15)
      : 0;

  const total = subtotal + delivery - discount;

  return (
    <main>
      <SiteHeader />

      <div className="cart-page">

        {/* Back */}
        <Link href="/menu" className="back">
          <ArrowLeft size={18} />
          <span>Continue shopping</span>
        </Link>

        {/* Page title */}
        <div className="page-title">
          <span className="eyebrow">
            Your order
          </span>

          <h1>Shopping bag</h1>
        </div>

        {/* Empty cart */}
        {!cart.length ? (
          <div className="empty-state">
            <h2>Your bag is waiting.</h2>

            <p>
              Pick something delicious from the menu.
            </p>

            <button
              type="button"
              className="cart-action-btn"
              onClick={() => router.push('/menu')}
            >
              <span>Browse menu</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="cart-layout">

            {/* ================= CART ITEMS ================= */}
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Product info */}
                  <div className="cart-item-info">
                    <Link
                      href={`/product/${item.slug}`}
                    >
                      <h3>{item.name}</h3>
                    </Link>

                    <p>
                      Rs. {item.price.toLocaleString()} each
                    </p>

                    {/* Quantity */}
                    <div className="qty">

                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          setQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus size={15} />
                      </button>

                      <b>
                        {item.quantity}
                      </b>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          setQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus size={15} />
                      </button>

                    </div>
                  </div>

                  {/* Item price */}
                  <strong className="cart-item-price">
                    Rs.{' '}
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </strong>

                  {/* Remove */}
                  <button
                    type="button"
                    className="remove"
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              ))}
            </div>

            {/* ================= SUMMARY ================= */}
            <aside className="summary">

              <span className="eyebrow">
                Summary
              </span>

              <h2>Order total</h2>

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
                  {delivery
                    ? 'Rs. 199'
                    : 'FREE'}
                </b>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div>
                  <span>
                    15% discount
                  </span>

                  <b>
                    − Rs.{' '}
                    {discount.toLocaleString()}
                  </b>
                </div>
              )}

              <hr />

              {/* Total */}
              <div className="total">
                <span>Total</span>

                <b>
                  Rs. {total.toLocaleString()}
                </b>
              </div>

              {/* ================= CHECKOUT BUTTON ================= */}
              <button
                type="button"
                className="cart-checkout-btn"
                onClick={() =>
                  router.push('/checkout')
                }
              >
                <span>Checkout</span>

                <ArrowRight size={20} />
              </button>

            </aside>
          </div>
        )}
      </div>

      <MobileNav />

      {/* Button styles */}
      <style jsx>{`
        .cart-checkout-btn,
        .cart-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          width: 100%;
          min-height: 56px;

          padding: 15px 22px;

          margin-top: 22px;

          border: none;
          border-radius: 14px;

          background: #111111;
          color: #ffffff;

          font-size: 15px;
          font-weight: 700;
          line-height: 1;

          text-decoration: none;

          cursor: pointer;

          visibility: visible;
          opacity: 1;

          position: relative;
          z-index: 20;

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .cart-checkout-btn:hover,
        .cart-action-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.16);
        }

        .cart-checkout-btn:active,
        .cart-action-btn:active {
          transform: translateY(0);
        }

        .cart-checkout-btn svg,
        .cart-action-btn svg {
          display: block;
          flex-shrink: 0;
          visibility: visible;
        }

        @media (max-width: 768px) {
          .cart-checkout-btn {
            min-height: 54px;
            margin-top: 18px;
          }
        }
      `}</style>
    </main>
  );
}
