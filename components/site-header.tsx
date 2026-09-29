'use client';

import Link from 'next/link';
import {
  Menu, ShoppingBag, Search, UserRound, X, Moon, Sun, Home, Heart,
  UtensilsCrossed
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from './providers';
import { site } from '@/lib/data';

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label={site.name}>
      <img src="/logo.svg" alt="" className="brand-logo" />
      <span className="brand-copy">
        <strong>{site.name}</strong>
        <small>{site.tag}</small>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { cartCount, darkMode, toggleDarkMode } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <Logo />

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#offers">Offers</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="theme-btn"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <Link href="/menu" className="round-btn" aria-label="Search menu">
            <Search />
          </Link>
          <Link href="/cart" className="cart-btn" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingBag />
            {cartCount > 0 && <b>{cartCount > 99 ? '99+' : cartCount}</b>}
          </Link>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setOpen(false)}><Home /> Home</Link>
          <Link href="/menu" onClick={() => setOpen(false)}><UtensilsCrossed /> Menu</Link>
          <Link href="/#offers" onClick={() => setOpen(false)}><Heart /> Offers</Link>
          <Link href="/orders" onClick={() => setOpen(false)}><ShoppingBag /> Orders</Link>
          <Link href="/account" onClick={() => setOpen(false)}><UserRound /> Account</Link>
        </div>
      )}
    </header>
  );
}

export function MobileNav() {
  const { cartCount } = useApp();
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/"><Home /><span>Home</span></Link>
      <Link href="/menu"><UtensilsCrossed /><span>Menu</span></Link>
      <Link href="/cart" className="mobile-cart-link">
        <ShoppingBag />
        {cartCount > 0 && <b>{cartCount > 99 ? '99+' : cartCount}</b>}
        <span>Bag</span>
      </Link>
      <Link href="/#offers"><Heart /><span>Offers</span></Link>
      <Link href="/account"><UserRound /><span>Account</span></Link>
    </nav>
  );
}

export function NotificationButton() {
  return null;
}
