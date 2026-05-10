import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronLeft, CreditCard } from 'lucide-react';
import { useStore } from '../StoreContext';
import { formatPKR, cn } from '../lib/utils';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8 bg-white dark:bg-brand-black transition-colors duration-300">
        <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center">
          <ShoppingBag size={48} className="text-zinc-300" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold italic">Your bag is empty</h1>
          <p className="text-zinc-500 max-w-sm mx-auto">Looks like you haven't added anything to your bag yet. Explore our latest collections to find your style.</p>
        </div>
        <Link 
          to="/shop" 
          className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-black min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-4 mb-12">
          <button onClick={() => navigate(-1)} className="p-2 border rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-4xl font-serif font-bold uppercase">Your Shopping Bag ({cart.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-brand-black/5 dark:border-white/5 relative group"
                >
                  <button 
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <Link to={`/product/${item.productId}`} className="w-full sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden bg-white">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </Link>
                  
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <Link to={`/product/${item.productId}`} className="text-xl font-serif font-bold hover:text-brand-gold transition-colors">{item.name}</Link>
                        <p className="text-lg font-bold font-serif">{formatPKR(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand-gold" /> Size: <span className="text-brand-black dark:text-white">{item.size}</span></span>
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand-gold" /> Color: <span className="text-brand-black dark:text-white">{item.color}</span></span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6">
                      <div className="flex items-center space-x-4 bg-white dark:bg-brand-black rounded-full px-2 py-1.5 border border-brand-black/5 dark:border-white/5">
                        <button 
                          onClick={() => updateCartQuantity(item.productId, item.size, item.color, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-zinc-400">Unit Price: {formatPKR(item.price)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 space-y-8 border border-brand-black/5 dark:border-white/5 shadow-xl shadow-brand-black/5 dark:shadow-white/5">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 uppercase font-bold tracking-widest text-[10px]">Subtotal</span>
                  <span className="font-bold">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 uppercase font-bold tracking-widest text-[10px]">Shipping</span>
                  <span className={cn("font-bold", shipping === 0 ? "text-green-500 uppercase" : "")}>
                    {shipping === 0 ? 'Free' : formatPKR(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-zinc-400 italic">Free shipping on orders over PKR 10,000</p>
                )}
                <div className="pt-6 border-t border-brand-black/10 dark:border-white/10 flex justify-between">
                  <span className="text-lg font-serif font-bold uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-serif font-bold text-brand-gold">{formatPKR(total)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link 
                  to="/checkout" 
                  className="w-full bg-brand-gold text-white h-16 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:brightness-110 transition-all transform hover:scale-[1.02] shadow-xl shadow-brand-gold/20"
                >
                  <CreditCard size={20} />
                  <span>Secure Checkout</span>
                </Link>
                <div className="flex justify-center flex-wrap gap-4 pt-4 grayscale opacity-40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                  {/* Mock icons for JazzCash/Easypaisa if available */}
                  <span className="text-[8px] font-bold tracking-widest border px-2 py-1 rounded">JAZZCASH</span>
                  <span className="text-[8px] font-bold tracking-widest border px-2 py-1 rounded">EASYPAISA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
