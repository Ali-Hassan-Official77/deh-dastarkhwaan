'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/data';

type CartItem = Product & { quantity: number };
type Order = {
  id: string;
  status: string;
  createdAt: string;
  eta: string;
  total: number;
  items: CartItem[];
  customer: { name: string; phone: string; address: string };
};
type Toast = { id: number; message: string; tone?: 'success' | 'info' | 'error' };

type AppContextValue = {
  cart: CartItem[];
  favorites: string[];
  orders: Order[];
  cartCount: number;
  subtotal: number;
  darkMode: boolean;
  toasts: Toast[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, q: number) => void;
  toggleFavorite: (id: string) => void;
  clearCart: () => void;
  saveOrder: (order: Order) => void;
  toggleDarkMode: () => void;
  toast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const KEYS = {
  cart: 'deh-dastarkhwan-cart',
  favorites: 'deh-dastarkhwan-favorites',
  orders: 'deh-dastarkhwan-orders',
  theme: 'deh-dastarkhwan-theme',
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate client state once. The hydrated guard prevents the initial
  // empty React state from overwriting saved cart/orders in localStorage.
  useEffect(() => {
    setCart(readJSON<CartItem[]>(KEYS.cart, []));
    setFavorites(readJSON<string[]>(KEYS.favorites, []));
    setOrders(readJSON<Order[]>(KEYS.orders, []));

    const savedTheme = localStorage.getItem(KEYS.theme);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEYS.favorites, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    if (hydrated) localStorage.setItem(KEYS.theme, darkMode ? 'dark' : 'light');
  }, [darkMode, hydrated]);

  const toast = (message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 2800);
  };

  const value = useMemo<AppContextValue>(() => ({
    cart,
    favorites,
    orders,
    darkMode,
    toasts,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

    addToCart: (product) => {
      setCart((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...current, { ...product, quantity: 1 }];
      });
      toast(`${product.name} added to your bag`);
    },

    removeFromCart: (id) => {
      setCart((current) => {
        const item = current.find((entry) => entry.id === id);
        if (item) {
          window.setTimeout(() => toast(`${item.name} removed`, 'info'), 0);
        }
        return current.filter((entry) => entry.id !== id);
      });
    },

    setQuantity: (id, q) => {
      setCart((current) =>
        q <= 0
          ? current.filter((item) => item.id !== id)
          : current.map((item) =>
              item.id === id ? { ...item, quantity: q } : item
            )
      );
    },

    toggleFavorite: (id) => {
      setFavorites((current) => {
        const isSaved = current.includes(id);
        window.setTimeout(
          () => toast(isSaved ? 'Removed from favorites' : 'Saved to favorites', 'info'),
          0
        );
        return isSaved
          ? current.filter((x) => x !== id)
          : [...current, id];
      });
    },

    clearCart: () => setCart([]),
    saveOrder: (order) => setOrders((current) => [order, ...current]),
    toggleDarkMode: () => setDarkMode((value) => !value),
    toast,
    dismissToast: (id) =>
      setToasts((current) => current.filter((item) => item.id !== id)),
  }), [cart, favorites, orders, darkMode, toasts]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <ToastStack />
    </AppContext.Provider>
  );
}

function ToastStack() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((item) => (
        <button
          type="button"
          key={item.id}
          className={`toast toast-${item.tone || 'success'}`}
          onClick={() => dismissToast(item.id)}
        >
          <span className="toast-check">✓</span>
          <span>{item.message}</span>
        </button>
      ))}
    </div>
  );
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
