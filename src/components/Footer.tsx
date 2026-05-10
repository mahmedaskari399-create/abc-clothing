import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Send, Phone, MapPin, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-brand-black/5 dark:border-white/5 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="font-serif text-2xl font-bold tracking-widest text-brand-black dark:text-white">
              ABC <span className="text-brand-gold">CLOTHING</span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Experience the pinnacle of luxury streetwear and modern fashion. Based in Pakistan, serving the fashion-forward globally.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white dark:bg-brand-black rounded-full shadow-sm hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-white dark:bg-brand-black rounded-full shadow-sm hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-white dark:bg-brand-black rounded-full shadow-sm hover:text-brand-gold transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-white dark:bg-brand-black rounded-full shadow-sm hover:text-brand-gold transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-sm tracking-widest mb-6 uppercase">Collections</h3>
            <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link to="/shop?category=Men" className="hover:text-brand-gold transition-colors">Men's Fashion</Link></li>
              <li><Link to="/shop?category=Women" className="hover:text-brand-gold transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?category=Kids" className="hover:text-brand-gold transition-colors">Junior Fashion</Link></li>
              <li><Link to="/shop?category=Streetwear" className="hover:text-brand-gold transition-colors">Premium Streetwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-brand-gold transition-colors">Luxury Accessories</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-bold text-sm tracking-widest mb-6 uppercase">Customer Care</h3>
            <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-brand-gold transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-brand-gold transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-brand-gold transition-colors">FAQs</Link></li>
              <li><Link to="/tracking" className="hover:text-brand-gold transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-sm tracking-widest mb-6 uppercase">Stay Inspired</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              Subscribe to our newsletter for exclusive access to new collections and seasonal sales.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full bg-white dark:bg-brand-black border border-brand-black/10 dark:border-white/10 rounded-full py-3 px-6 text-sm outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <button type="submit" className="absolute right-2 top-1.5 p-1.5 bg-brand-gold text-white rounded-full hover:opacity-90 transition-opacity">
                  <Send size={16} />
                </button>
              </div>
            </form>
            <div className="mt-8 pt-8 border-t border-brand-black/5 dark:border-white/5">
              <a href="https://wa.me/923000000000" className="flex items-center space-x-2 text-sm font-medium text-green-600 dark:text-green-500 hover:opacity-80 transition-opacity">
                <MessageCircle size={20} />
                <span>Support on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-zinc-500 uppercase tracking-widest font-medium">
          <p>© 2026 ABC CLOTHING. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center space-x-4 grayscale opacity-60">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};
