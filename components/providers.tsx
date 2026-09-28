'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/data';

type CartItem = Product & { quantity: number };
type Order = { id: string; status: string; createdAt: string; eta: string; total: number; items: CartItem[]; customer: { name: string; phone: string; address: string } };
type Toast = { id: number; message: string; tone?: 'success' | 'info' | 'error' };

type AppContextValue = {
  cart: CartItem[]; favorites: string[]; orders: Order[]; cartCount: number; subtotal: number;
  darkMode: boolean; toasts: Toast[];
  addToCart: (product: Product) => void; removeFromCart: (id: string) => void; setQuantity: (id: string, q: number) => void;
  toggleFavorite: (id: string) => void; clearCart: () => void; saveOrder: (order: Order) => void;
  toggleDarkMode: () => void; toast: (message: string, tone?: Toast['tone']) => void; dismissToast: (id: number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem('deh-dastarkhwan-cart') || '[]'));
      setFavorites(JSON.parse(localStorage.getItem('deh-dastarkhwan-favorites') || '[]'));
      setOrders(JSON.parse(localStorage.getItem('deh-dastarkhwan-orders') || '[]'));
      const savedTheme = localStorage.getItem('deh-dastarkhwan-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
    } catch {}
  }, []);

  useEffect(() => localStorage.setItem('deh-dastarkhwan-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('deh-dastarkhwan-favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('deh-dastarkhwan-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('deh-dastarkhwan-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toast = (message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 2800);
  };

  const value = useMemo<AppContextValue>(() => ({
    cart, favorites, orders, darkMode, toasts,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addToCart: (product) => {
      setCart((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        return [...current, { ...product, quantity: 1 }];
      });
      toast(`${product.name} added to your bag`);
    },
    removeFromCart: (id) => {
      const item = cart.find((entry) => entry.id === id);
      setCart((current) => current.filter((entry) => entry.id !== id));
      if (item) toast(`${item.name} removed`, 'info');
    },
    setQuantity: (id, q) => setCart((current) => q <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity: q } : item)),
    toggleFavorite: (id) => {
      const product = undefined;
      setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
      toast(favorites.includes(id) ? 'Removed from favorites' : 'Saved to favorites', 'info');
      void product;
    },
    clearCart: () => setCart([]),
    saveOrder: (order) => setOrders((current) => [order, ...current]),
    toggleDarkMode: () => setDarkMode((value) => !value),
    toast,
    dismissToast: (id) => setToasts((current) => current.filter((item) => item.id !== id)),
  }), [cart, favorites, orders, darkMode, toasts]);

  return <AppContext.Provider value={value}>{children}<ToastStack /></AppContext.Provider>;
}

function ToastStack() {
  const { toasts, dismissToast } = useApp();
  return <div className="toast-stack" aria-live="polite">{toasts.map((item) => <button key={item.id} className={`toast toast-${item.tone || 'success'}`} onClick={() => dismissToast(item.id)}><span className="toast-check">✓</span><span>{item.message}</span></button>)}</div>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
