
'use client';

import Link from 'next/link';
import {
  PackageCheck,
  ArrowRight,
} from 'lucide-react';

import { useApp } from './providers';
import { site } from '@/lib/data';
import {
  SiteHeader,
  MobileNav,
} from './site-header';

export function OrdersPage() {
  const { orders } = useApp();

  return (
    <main>
      <SiteHeader />

      <div className="page-wrap">
        {/* Page Header */}
        <div className="page-title">
          <span className="eyebrow">
            {site.name}
          </span>

          <h1>Your orders</h1>

          <p>
            Track your latest kitchen tickets.
          </p>
        </div>

        {/* ================= EMPTY ORDERS ================= */}
        {!orders.length ? (
          <div className="empty-state">
            <PackageCheck size={52} />

            <h2>No orders yet</h2>

            <p>
              Your completed orders will appear here.
            </p>

            <Link
              href="/menu"
              className="order-action-btn"
            >
              <span>Start ordering</span>
              <ArrowRight size={19} />
            </Link>
          </div>
        ) : (
          /* ================= ORDERS ================= */
          <div className="orders-list">
            {orders.map((order) => (
              <article
                key={order.id}
                className="order-card"
              >
                <div className="order-info">
                  <span className="order-id">
                    {order.id}
                  </span>

                  <h3>
                    {order.status}
                  </h3>

                  <p>
                    {order.customer?.address}
                  </p>
                </div>

                <strong className="order-total">
                  Rs.{' '}
                  {order.total.toLocaleString()}
                </strong>

                <small className="order-eta">
                  {order.eta}
                </small>
              </article>
            ))}
          </div>
        )}
      </div>

      <MobileNav />

      {/* Local button styling so primary-btn CSS
          cannot make this invisible */}
      <style jsx>{`
        .order-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: auto;
          min-width: 190px;
          min-height: 54px;
          padding: 14px 22px;
          margin-top: 18px;

          background: #111;
          color: #fff;

          border: 0;
          border-radius: 14px;

          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          text-decoration: none;

          visibility: visible;
          opacity: 1;
          position: relative;
          z-index: 20;

          cursor: pointer;

          transition:
            transform 180ms ease,
            opacity 180ms ease,
            box-shadow 180ms ease;
        }

        .order-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
        }

        .order-action-btn:active {
          transform: translateY(0);
        }

        .order-action-btn svg {
          flex-shrink: 0;
          display: block;
          visibility: visible;
        }

        .order-card {
          position: relative;
          z-index: 1;
        }

        .order-id,
        .order-info h3,
        .order-info p,
        .order-total,
        .order-eta {
          visibility: visible;
          opacity: 1;
        }

        @media (max-width: 640px) {
          .order-action-btn {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>
    </main>
  );
}
