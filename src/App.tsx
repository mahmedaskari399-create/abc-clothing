/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './StoreContext';
import { Layout } from './components/Layout';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Shop = React.lazy(() => import('./pages/Shop'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Contact = React.lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <React.Suspense fallback={
          <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-brand-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </StoreProvider>
  );
}
