"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Minus,
  Star,
  MapPin,
} from "lucide-react";
import { useState } from "react";

import {
  findProduct,
  products,
  site,
} from "@/lib/data";

import {
  SiteHeader,
  MobileNav,
} from "./site-header";

import { ProductCard } from "./product-card";
import { useApp } from "./providers";

export function ProductPage({
  slug,
}: {
  slug: string;
}) {
  const product = findProduct(slug);
  const [qty, setQty] = useState(1);
  const { addToCart } = useApp();

  if (!product) {
    return (
      <main>
        <SiteHeader />

        <div className="empty-state">
          <h1>Dish not found</h1>

          <p>
            The dish you are looking for does not exist
            or may have been removed.
          </p>

          <Link
            href="/menu"
            className="primary-btn"
          >
            Back to menu
          </Link>
        </div>

        <MobileNav />
      </main>
    );
  }

  const increaseQty = () => {
    setQty((current) => current + 1);
  };

  const decreaseQty = () => {
    setQty((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i += 1) {
      addToCart({
        ...product,
        badge: product.badge ?? undefined,
      });
    }
  };

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <main>
      <SiteHeader />

      <div className="detail-page">
        <Link
          href="/menu"
          className="back"
        >
          <ArrowLeft size={18} />
          Back to menu
        </Link>

        <div className="detail-grid">
          {/* PRODUCT IMAGE */}
          <div className="detail-photo">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* PRODUCT DETAILS */}
          <div className="detail-copy">
            <span className="eyebrow">
              {product.badge || "HOUSE MENU"}
            </span>

            <h1>{product.name}</h1>

            <div className="detail-rating">
              <Star size={18} fill="currentColor" />

              <span>{product.rating}</span>

              <span>
                ({product.reviews} reviews)
              </span>
            </div>

            <p className="detail-desc">
              {product.description}
            </p>

            {product.ingredients?.length > 0 && (
              <div className="ingredients">
                {product.ingredients.map((ingredient) => (
                  <span key={ingredient}>
                    {ingredient}
                  </span>
                ))}
              </div>
            )}

            <div className="buy-row">
              <strong>
                Rs. {product.price.toLocaleString()}
              </strong>

              <div
                className="qty"
                aria-label="Quantity"
              >
                <button
                  type="button"
                  onClick={decreaseQty}
                  aria-label="Decrease quantity"
                >
                  <Minus size={17} />
                </button>

                <b>{qty}</b>

                <button
                  type="button"
                  onClick={increaseQty}
                  aria-label="Increase quantity"
                >
                  <Plus size={17} />
                </button>
              </div>

              <button
                type="button"
                className="primary-btn"
                onClick={handleAddToCart}
              >
                Add to bag
              </button>
            </div>

            <div className="detail-note">
              <MapPin size={18} />

              <span>
                Delivery available around{" "}
                {site.location}.
              </span>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="related">
            <span className="eyebrow">
              You may also like
            </span>

            <h2>More from the kitchen</h2>

            <div className="product-grid">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={{
                    ...item,
                    badge: item.badge ?? undefined,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <MobileNav />
    </main>
  );
}