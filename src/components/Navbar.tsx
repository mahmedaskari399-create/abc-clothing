import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, User, Menu, X, Sun, Moon, Languages, Heart } from 'lucide-react';
import { useStore } from '../StoreContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, user, darkMode, toggleDarkMode, language, toggleLanguage } = useStore();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-brand-black/80 backdrop-blur-md border-b border-brand-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-black dark:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link to="/shop?category=Men" className="text-sm font-medium hover:text-brand-gold transition-colors">{language === 'EN' ? 'MEN' : 'مردانہ'}</Link>
            <Link to="/shop?category=Women" className="text-sm font-medium hover:text-brand-gold transition-colors">{language === 'EN' ? 'WOMEN' : 'خواتین'}</Link>
            <Link to="/shop?category=Streetwear" className="text-sm font-medium hover:text-brand-gold transition-colors">{language === 'EN' ? 'STREETWEAR' : 'اسٹریٹ ویئر'}</Link>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="font-serif text-2xl lg:text-3xl font-bold tracking-widest text-brand-black dark:text-white">ABC <span className="text-brand-gold">CLOTHING</span></span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-brand-gold transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button onClick={toggleLanguage} className="p-2 hover:text-brand-gold transition-colors" title="Switch Language">
              <Languages size={20} />
            </button>
            <button onClick={toggleDarkMode} className="p-2 hover:text-brand-gold transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/profile" className="p-2 hover:text-brand-gold transition-colors">
              <User size={20} />
              {user && <span className="absolute top-4 right-4 w-2 h-2 bg-brand-gold rounded-full"></span>}
            </Link>
            <Link to="/cart" className="p-2 hover:text-brand-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="md:hidden fixed inset-0 top-20 bg-white dark:bg-brand-black z-40 p-6 flex flex-col space-y-6"
          >
            <Link to="/shop?category=Men" onClick={() => setIsOpen(false)} className="text-2xl font-serif">{language === 'EN' ? 'Men' : 'مردانہ'}</Link>
            <Link to="/shop?category=Women" onClick={() => setIsOpen(false)} className="text-2xl font-serif">{language === 'EN' ? 'Women' : 'خواتین'}</Link>
            <Link to="/shop?category=Kids" onClick={() => setIsOpen(false)} className="text-2xl font-serif">{language === 'EN' ? 'Kids' : 'بچے'}</Link>
            <Link to="/shop?category=Streetwear" onClick={() => setIsOpen(false)} className="text-2xl font-serif">{language === 'EN' ? 'Streetwear' : 'اسٹریٹ ویئر'}</Link>
            <Link to="/shop?category=Accessories" onClick={() => setIsOpen(false)} className="text-2xl font-serif">{language === 'EN' ? 'Accessories' : 'ایکسیسریز'}</Link>
            <div className="pt-6 border-t border-brand-black/10 dark:border-white/10 flex flex-col space-y-4">
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg flex items-center space-x-2">
                <User size={20} /> <span>{user ? user.displayName : (language === 'EN' ? 'Login' : 'لاگ ان')}</span>
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg">{language === 'EN' ? 'Contact Us' : 'رابطہ کریں'}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white dark:bg-brand-black border-b border-brand-black/5 dark:border-white/5 p-4 z-40 shadow-xl"
          >
            <div className="max-w-3xl mx-auto flex items-center relative">
              <Search className="absolute left-4 text-brand-black/40 dark:text-white/40" size={20} />
              <input
                autoFocus
                placeholder={language === 'EN' ? "Search collections, products..." : "کلیکشنز، مصنوعات تلاش کریں..."}
                className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-full py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-gold/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/shop?search=${e.currentTarget.value}`);
                    setSearchOpen(false);
                  }
                }}
              />
              <button onClick={() => setSearchOpen(false)} className="ml-4 p-2">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
