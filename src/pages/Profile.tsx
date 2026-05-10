import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Package, MapPin, Settings, LogOut, 
  ChevronRight, Box, Clock, CheckCircle, Truck,
  Trash2, Plus, Edit
} from 'lucide-react';
import { useStore } from '../StoreContext';
import { formatPKR, cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, login, logout, orders, language } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [email, setEmail] = useState('');

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-brand-black transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-12 bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] border border-brand-black/5 dark:border-white/5 shadow-2xl"
        >
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl font-serif font-bold uppercase tracking-tight">Welcome Back</h1>
            <p className="text-zinc-500 text-sm">Join the ABC Clothing elite for exclusive access.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-4">Email Address</label>
              <input 
                type="email" 
                placeholder="name@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 px-6 border border-brand-black/5 dark:border-white/5 outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
            <button 
              onClick={() => login(email || 'demo@user.com')}
              className="w-full bg-brand-gold text-white h-16 rounded-full font-bold uppercase tracking-widest hover:brightness-110 shadow-xl shadow-brand-gold/20 transition-all"
            >
              SIGN IN
            </button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-zinc-50 dark:bg-zinc-900 px-4">Or continue with</span></div>
            </div>
            <button className="w-full bg-white dark:bg-brand-black text-brand-black dark:text-white h-16 rounded-full border border-brand-black/5 dark:border-white/5 font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5" />
              <span>Google Account</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-black min-h-screen transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-brand-black/5 dark:border-white/5 shadow-sm space-y-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center border-4 border-white dark:border-brand-black shadow-lg">
                  {user.photoURL ? <img src={user.photoURL} className="rounded-full" /> : <User size={40} />}
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl">{user.displayName}</h2>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">{user.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'orders', label: 'Order History', icon: Package },
                  { id: 'profile', label: 'My Profile', icon: User },
                  { id: 'addresses', label: 'Managed Addresses', icon: MapPin },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={cn(
                      "w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm",
                      activeTab === item.id 
                        ? "bg-brand-black text-white dark:bg-white dark:text-brand-black shadow-lg" 
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                    )}
                  >
                    <item.icon size={18} />
                    <span className="uppercase tracking-widest text-[10px]">{item.label}</span>
                  </button>
                ))}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-all font-bold text-sm"
                  >
                    <Settings size={18} />
                    <span className="uppercase tracking-widest text-[10px]">Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
                >
                  <LogOut size={18} />
                  <span className="uppercase tracking-widest text-[10px]">Sign Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.div 
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-3xl font-serif font-bold">Order History</h2>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{orders.length} total orders</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-brand-black/5 dark:border-white/5 rounded-[2.5rem] p-20 text-center space-y-6">
                      <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-300">
                        <Box size={32} />
                      </div>
                      <p className="text-zinc-500 uppercase tracking-[0.2em] font-bold text-xs">No orders placed yet</p>
                      <Link to="/shop" className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-10 py-3 rounded-full font-bold uppercase tracking-widest text-xs inline-block">Explore Now</Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="bg-zinc-50 dark:bg-zinc-900 border border-brand-black/5 dark:border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center font-bold">#</div>
                              <div>
                                <p className="font-bold uppercase tracking-widest text-sm">{order.id}</p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <p className="text-lg font-serif font-bold text-brand-gold">{formatPKR(order.total)}</p>
                              <span className={cn(
                                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                order.status === 'Delivered' ? "bg-green-500/10 text-green-500" : "bg-brand-gold/10 text-brand-gold"
                              )}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex -space-x-4 overflow-hidden py-2">
                            {order.items.map((item, idx) => (
                              <img key={idx} src={item.image} className="w-12 h-16 object-cover rounded-xl border-2 border-zinc-50 dark:border-zinc-900 shadow-md" />
                            ))}
                            {order.items.length > 5 && (
                              <div className="w-12 h-16 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-brand-black">+{order.items.length - 5}</div>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-6 border-t border-brand-black/5 dark:border-white/5">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <Truck size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Est. Delivery: {order.status === 'Pending' ? '3-5 Business Days' : 'Delivered'}</span>
                            </div>
                            <button className="text-[10px] font-bold uppercase tracking-widest border-b border-brand-black/20 dark:border-white/20 hover:text-brand-gold hover:border-brand-gold transition-colors">Details</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12 max-w-2xl"
                >
                  <h2 className="text-3xl font-serif font-bold">Personal Profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-4">Full Name</label>
                        <input type="text" defaultValue={user.displayName} className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-2xl py-4 px-6 border border-brand-black/5 outline-none focus:ring-1 focus:ring-brand-gold" />
                    </div>
                    <div className="space-y-2 text-zinc-400">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-4">Email Address (Immutable)</label>
                        <input type="email" disabled defaultValue={user.email} className="w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl py-4 px-6 border border-transparent outline-none" />
                    </div>
                  </div>
                  <button className="bg-brand-gold text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand-gold/20">Update Settings</button>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div 
                  key="addresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-3xl font-serif font-bold">Managed Addresses</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-black dark:bg-white text-white dark:text-brand-black rounded-[2.5rem] p-8 space-y-6 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 bg-brand-gold text-white rounded-bl-3xl">
                        <CheckCircle size={16} />
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white/10 dark:bg-brand-black/10 rounded-full"><MapPin size={18} /></div>
                         <h3 className="font-bold uppercase tracking-widest text-xs">Primary Shipping</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="font-serif italic text-xl">123 Luxury Avenue</p>
                        <p className="text-sm opacity-60 uppercase tracking-widest font-medium">Phase 6, DHA, Karachi, 75500</p>
                        <p className="text-sm opacity-60">+92 312 3456789</p>
                      </div>
                      <div className="flex gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-brand-gold">Edit</button>
                         <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-red-500">Delete</button>
                      </div>
                    </div>

                    <button className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-zinc-400 hover:text-brand-gold hover:border-brand-gold transition-all space-y-4">
                      <Plus size={32} />
                      <span className="uppercase tracking-[0.3em] font-bold text-[10px]">Add New Address</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
