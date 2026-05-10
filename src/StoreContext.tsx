import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile } from './types';
import { MOCK_PRODUCTS } from './constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: UserProfile | null;
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string) => void;
  logout: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'userId' | 'status'>) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: 'EN' | 'UR';
  toggleLanguage: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('abc_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('abc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('abc_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('abc_theme') === 'dark');
  const [language, setLanguage] = useState<'EN' | 'UR'>(() => (localStorage.getItem('abc_lang') as 'EN' | 'UR') || 'EN');

  useEffect(() => {
    localStorage.setItem('abc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('abc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('abc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('abc_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('abc_lang', language);
  }, [language]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.size === item.size && i.color === item.color);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.size === size && i.color === color)));
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setCart(prev => prev.map(i => 
      (i.productId === productId && i.size === size && i.color === color) ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setCart([]);

  const login = (email: string) => {
    setUser({
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'user'
    });
  };

  const logout = () => setUser(null);

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'userId' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: user?.uid || 'guest',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => prev === 'EN' ? 'UR' : 'EN');

  return (
    <StoreContext.Provider value={{
      products, cart, user, orders,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      login, logout, placeOrder,
      darkMode, toggleDarkMode,
      language, toggleLanguage
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
