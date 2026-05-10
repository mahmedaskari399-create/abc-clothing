import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, ChevronRight, Truck, CreditCard, 
  MapPin, Phone, Package, ArrowRight, ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../StoreContext';
import { formatPKR, cn } from '../lib/utils';
import { PAKISTAN_CITIES } from '../constants';
import confetti from 'canvas-confetti';

const steps = [
  { id: 'shipping', title: 'Shipping', icon: Truck },
  { id: 'payment', title: 'Payment', icon: CreditCard },
  { id: 'review', title: 'Review', icon: Check }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, placeOrder, user, language } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOrdered, setIsOrdered] = useState(false);

  const [formData, setFormData] = useState({
    street: '',
    city: PAKISTAN_CITIES[0],
    zipCode: '',
    phone: '',
    paymentMethod: 'COD' as 'Stripe' | 'JazzCash' | 'Easypaisa' | 'COD'
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    placeOrder({
      items: cart,
      total,
      address: {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipCode,
        phone: formData.phone
      },
      paymentMethod: formData.paymentMethod
    });
    setIsOrdered(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#1A1A1A', '#FFFFFF']
    });
  };

  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-brand-black transition-colors duration-300">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-8"
        >
          <div className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 mb-8 shadow-xl shadow-green-500/20">
            <Check size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-serif font-bold italic">Order Placed!</h1>
            <p className="text-zinc-500 max-w-sm mx-auto">Thank you for shopping with ABC Clothing. Your order is being processed and will be delivered within 3-5 business days.</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-brand-black/5 dark:border-white/5 rounded-[2rem] p-8 max-w-md mx-auto space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Order ID</span>
              <span className="font-bold">#ORD-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Delivery To</span>
              <span className="font-bold">{formData.city}, PK</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/shop" className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
              CONTINUE SHOPPING
            </Link>
            <Link to="/profile" className="border-2 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              TRACK ORDER
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-black min-h-screen transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-16 px-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 -z-10 group"></div>
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center space-y-4 relative z-10 bg-white dark:bg-brand-black px-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  currentStep >= idx ? "bg-brand-gold border-brand-gold text-white shadow-lg shadow-brand-gold/30" : "bg-white dark:bg-brand-black border-zinc-200 dark:border-zinc-800"
                )}>
                  {currentStep > idx ? <Check size={20} /> : <step.icon size={20} />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em]",
                  currentStep >= idx ? "text-brand-gold" : "text-zinc-400"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-10 border border-brand-black/5 dark:border-white/5 shadow-xl">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div 
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl font-serif font-bold uppercase tracking-tight">Shipping Information</h2>
                      <p className="text-zinc-500 text-sm">Where should we deliver your luxury pieces?</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-4">Street Address</label>
                        <input 
                          type="text" 
                          placeholder="House No., Street name, Area"
                          value={formData.street}
                          onChange={e => setFormData({ ...formData, street: e.target.value })}
                          className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 px-6 border border-brand-black/5 dark:border-white/5 outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-4">City</label>
                        <select 
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 px-6 border border-brand-black/5 dark:border-white/5 outline-none focus:ring-1 focus:ring-brand-gold appearance-none"
                        >
                          {PAKISTAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-4">ZIP / Postal Code</label>
                        <input 
                          type="text" 
                          placeholder="Postal code"
                          value={formData.zipCode}
                          onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 px-6 border border-brand-black/5 dark:border-white/5 outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-4">Phone Number</label>
                        <div className="relative">
                          <span className="absolute left-6 top-4 font-bold text-zinc-400">+92</span>
                          <input 
                            type="tel" 
                            placeholder="312 3456789"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 pl-16 pr-6 border border-brand-black/5 dark:border-white/5 outline-none focus:ring-1 focus:ring-brand-gold"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div 
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl font-serif font-bold uppercase tracking-tight">Payment Method</h2>
                      <p className="text-zinc-500 text-sm">Select your preferred secure payment option.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'COD', title: 'Cash on Delivery', desc: 'Pay when you receive the package' },
                        { id: 'Stripe', title: 'Credit / Debit Card', desc: 'Secure payment via card' },
                        { id: 'JazzCash', title: 'JazzCash Mobile Wallet', desc: 'Instant payment from mobile' },
                        { id: 'Easypaisa', title: 'Easypaisa Mobile Wallet', desc: 'Secure digital wallet payment' }
                      ].map(method => (
                        <label 
                          key={method.id}
                          className={cn(
                            "flex items-center justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all",
                            formData.paymentMethod === method.id 
                              ? "border-brand-gold bg-brand-gold/5 shadow-inner" 
                              : "border-brand-black/5 dark:border-white/5 bg-white dark:bg-brand-black hover:border-brand-gold/30"
                          )}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                              formData.paymentMethod === method.id ? "border-brand-gold bg-brand-gold" : "border-zinc-200 dark:border-zinc-800"
                            )}>
                              {formData.paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div>
                              <p className="font-bold uppercase tracking-widest text-[10px]">{method.title}</p>
                              <p className="text-xs text-zinc-500">{method.desc}</p>
                            </div>
                          </div>
                          <input 
                            type="radio" 
                            name="payment" 
                            className="hidden" 
                            checked={formData.paymentMethod === method.id}
                            onChange={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                          />
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div 
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl font-serif font-bold uppercase tracking-tight">Review Order</h2>
                      <p className="text-zinc-500 text-sm">Please review your order details before final confirmation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2">Shipping To</p>
                          <div className="flex items-start space-x-3">
                            <MapPin size={20} className="text-zinc-400 mt-1" />
                            <div>
                              <p className="font-bold text-sm tracking-widest uppercase">{formData.street}</p>
                              <p className="text-sm text-zinc-500 uppercase">{formData.city}, {formData.zipCode}</p>
                              <p className="text-sm text-zinc-500">{formData.phone}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2">Payment Method</p>
                          <div className="flex items-center space-x-3">
                            <CreditCard size={20} className="text-zinc-400" />
                            <p className="font-bold text-sm tracking-widest uppercase">{formData.paymentMethod}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2">Bag Items ({cart.length})</p>
                        <div className="max-h-[200px] overflow-y-auto space-y-4 pr-4">
                          {cart.map(item => (
                            <div key={`${item.productId}-${item.size}`} className="flex items-center space-x-4 bg-white dark:bg-brand-black p-4 rounded-2xl border border-brand-black/5">
                              <img src={item.image} className="w-12 h-16 object-cover rounded-lg" />
                              <div className="flex-grow">
                                <p className="text-xs font-bold uppercase tracking-tight truncate">{item.name}</p>
                                <p className="text-[8px] text-zinc-400 uppercase tracking-widest">{item.size} | {item.color}</p>
                              </div>
                              <p className="text-xs font-bold font-serif">{formatPKR(item.price)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-center pt-10 border-t border-brand-black/5 dark:border-white/5 mt-12">
                <button 
                  onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 0}
                  className="px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-0 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-brand-gold text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:brightness-110 shadow-xl shadow-brand-gold/20 transition-all"
                >
                  <span>{currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-brand-black/5 dark:border-white/5 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Order Total</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-bold uppercase">Subtotal</span>
                  <span className="font-bold">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-bold uppercase">Shipping</span>
                  <span className="font-bold text-green-500">{shipping === 0 ? 'FREE' : formatPKR(shipping)}</span>
                </div>
                <div className="pt-6 border-t border-brand-black/10 dark:border-white/10 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest">Payable Amount</span>
                  <span className="text-2xl font-serif font-bold text-brand-gold">{formatPKR(total)}</span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-gold/10 text-brand-gold rounded-full"><ShieldCheck size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</p>
                  <p className="text-xs text-zinc-500">Your information is protected by industry standard encryption.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-gold/10 text-brand-gold rounded-full"><Package size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Trackable Shipping</p>
                  <p className="text-xs text-zinc-500">All orders include real-time tracking across Pakistan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
