"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock3,
  Star,
  ChevronRight,
} from "lucide-react";

import {
  site,
  products,
  categories,
  offers,
} from "@/lib/data";

import { SiteHeader, MobileNav } from "./site-header";
import { ProductCard } from "./product-card";

export function HomePage() {
  const popular = products.filter((p) => p.popular);
  const featured = products[0];

  return (
    <main>
      <SiteHeader />

      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{site.tag}</span>

          <h1>
            {site.variant === "editorial"
              ? "A table worth slowing down for."
              : site.variant === "coastal"
              ? "Straight from the coast to your table."
              : site.variant === "cafe"
              ? "Good mornings start here."
              : site.variant === "modern"
              ? "Built for big cravings."
              : "Food that feels like home."}
          </h1>

          <p>
            {site.variant === "cafe"
              ? "Specialty coffee, all-day brunch and bakery comfort in the heart of Islamabad."
              : "Freshly prepared food, honest portions and a local kitchen made for everyday cravings."}
          </p>

          <div className="hero-actions">
            <Link href="/menu" className="primary-btn">
              Explore menu
              <ArrowRight size={18} />
            </Link>

            <a href={`tel:${site.phone}`} className="ghost-btn">
              Call {site.phone}
            </a>
          </div>

          <div className="hero-meta">
            <span>
              <Clock3 size={17} />
              20–35 min
            </span>

            <span>
              <MapPin size={17} />
              {site.location}
            </span>

            <span>
              <Star size={17} />
              4.9 local rating
            </span>
          </div>
        </div>

        {/* HERO IMAGE */}
        {featured && (
          <div className="hero-art">
            <img
              src={featured.image}
              alt={featured.name}
              loading="eager"
            />

            <div className="floating-card">
              <small>Today’s signature</small>

              <b>{featured.name}</b>

              <span>
                Rs. {featured.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="category-area">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Browse</span>
            <h2>Choose your mood</h2>
          </div>

          <Link href="/menu">
            Full menu
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              href={`/menu?category=${encodeURIComponent(category.id)}`}
              key={category.id}
              className="category-card"
            >
              <span>{category.icon}</span>

              <b>{category.name}</b>

              <small>{category.note}</small>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="popular">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              Customer favourites
            </span>

            <h2>Order the classics</h2>
          </div>

          <Link href="/menu">
            See everything
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="product-grid">
          {popular.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                badge: product.badge ?? undefined,
              }}
            />
          ))}
        </div>
      </section>

      {/* OFFERS */}
      <section className="offer-section" id="offers">
        <div className="offer-intro">
          <span className="eyebrow">Offers</span>

          <h2>
            Good food. Better reasons to order.
          </h2>

          <p>
            Simple local deals, updated for the week.
          </p>
        </div>

        <div className="offer-grid">
          {offers.map((offer) => (
            <div
              className="offer-card"
              key={offer.code}
            >
              <span>{offer.label}</span>

              <b>{offer.title}</b>

              <p>{offer.sub}</p>

              <code>{offer.code}</code>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="map-section">
        <div>
          <span className="eyebrow">Find us</span>

          <h2>Come by or order in.</h2>

          <p>{site.location}</p>

          <a
            href={`tel:${site.phone}`}
            className="primary-btn"
          >
            {site.phone}
          </a>

          <a
            href={`mailto:${site.email}`}
            className="email-link"
          >
            {site.email}
          </a>
        </div>

        <iframe
          title={`${site.name} map`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            site.map
          )}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <Link
            href="/"
            className="footer-logo"
            aria-label={site.name}
          >
            <span className="footer-logo-mark">
              {site.name.charAt(0)}
            </span>

            <span className="footer-logo-text">
              {site.name}
            </span>
          </Link>

          <p>
            {site.tag}. Fresh food, friendly service and
            easy ordering.
          </p>
        </div>

        <div className="footer-column">
          <b>Explore</b>

          <Link href="/menu">Menu</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </div>

        <div className="footer-column">
          <b>Contact</b>

          <span>{site.location}</span>

          <a href={`tel:${site.phone}`}>
            {site.phone}
          </a>

          <a href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {site.name}. All
          rights reserved.
        </div>
      </footer>

      <MobileNav />
    </main>
  );
}