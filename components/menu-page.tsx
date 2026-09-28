
'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';

import {
  products,
  categories,
  site,
} from '@/lib/data';

import {
  SiteHeader,
  MobileNav,
} from './site-header';

import { ProductCard } from './product-card';

export function MenuPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const search = q.trim().toLowerCase();

  const filtered = products.filter((product) => {
    // Search filter
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    // Category filter
    const matchesCategory =
      cat === 'all' ||
      product.category === cat;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <SiteHeader />

      <div className="page-wrap">
        {/* ================= PAGE HEADER ================= */}
        <div className="page-title">
          <span className="eyebrow">
            {site.name}
          </span>

          <h1>The full menu</h1>

          <p>
            Everything is prepared to order from our local kitchen.
          </p>
        </div>

        {/* ================= MENU TOOLS ================= */}
        <div className="menu-tools">
          {/* Search */}
          <div className="search-box">
            <Search size={20} />

            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes, drinks, desserts..."
              aria-label="Search menu"
            />
          </div>

          {/* Categories */}
          <div className="chips">
            <button
              type="button"
              className={cat === 'all' ? 'active' : ''}
              onClick={() => setCat('all')}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={
                  cat === category.id
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setCat(category.id)
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  badge: product.badge ?? undefined,
                }}
              />
            ))}
          </div>
        ) : (
          /* ================= NO RESULTS ================= */
          <div className="empty-state">
            <Search size={42} />

            <h2>No dishes found</h2>

            <p>
              Try another search or choose a different category.
            </p>

            {(q || cat !== 'all') && (
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  setQ('');
                  setCat('all');
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <MobileNav />
    </main>
  );
}
