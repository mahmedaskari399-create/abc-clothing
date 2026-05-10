import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, Box, ShoppingCart, Users, 
  TrendingUp, DollarSign, Package, AlertCircle,
  Plus, Search, Edit, Trash2, ChevronRight
} from 'lucide-react';
import { useStore } from '../StoreContext';
import { formatPKR, cn } from '../lib/utils';
import { Link, Navigate } from 'react-router-dom';

const Admin = () => {
  const { user, products, orders } = useStore();

  if (!user || user.role !== 'admin') return <Navigate to="/profile" />;

  const stats = [
    { label: 'Total Revenue', value: formatPKR(245000), icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Active Orders', value: orders.length, icon: ShoppingCart, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { label: 'Inventory', value: products.length, icon: Box, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Customers', value: '1,280', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 bg-white dark:bg-brand-black p-10 rounded-[3rem] border border-brand-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl"></div>
          <div className="space-y-1 relative z-10">
            <h1 className="text-4xl font-serif font-bold uppercase italic">Command Center</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">ABC Clothing Management</p>
          </div>
          <div className="flex items-center space-x-6 relative z-10">
            <div className="flex flex-col items-end">
                <p className="text-xs font-bold uppercase tracking-widest">{user.displayName}</p>
                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-tighter">System Administrator</p>
            </div>
            <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} className="w-14 h-14 rounded-3xl border-2 border-brand-gold shadow-lg" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-brand-black p-8 rounded-[2.5rem] border border-brand-black/5 shadow-sm space-y-6"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={stat.color} size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-serif font-bold text-brand-black dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Table Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-brand-black rounded-[3rem] p-10 border border-brand-black/5 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold uppercase">Inventory Status</h3>
                <div className="flex space-x-4">
                    <button className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:text-brand-gold transition-colors"><Search size={20} /></button>
                    <button className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                        <Plus size={16} /> Add Product
                    </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 border-b border-brand-black/5 pb-4">
                      <th className="pb-4 pt-0">Product</th>
                      <th className="pb-4 pt-0">Category</th>
                      <th className="pb-4 pt-0">Stock</th>
                      <th className="pb-4 pt-0 text-right">Price</th>
                      <th className="pb-4 pt-0 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-black/5">
                    {products.map(p => (
                      <tr key={p.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                        <td className="py-6 flex items-center space-x-4">
                          <img src={p.images[0]} className="w-12 h-16 object-cover rounded-xl shadow-sm" />
                          <div>
                            <p className="text-sm font-bold truncate max-w-[150px]">{p.name}</p>
                            <p className="text-[9px] text-zinc-500 uppercase tracking-widest">ID: {p.id}</p>
                          </div>
                        </td>
                        <td className="py-6">
                           <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest rounded-full">{p.category}</span>
                        </td>
                        <td className="py-6">
                           <div className="flex items-center space-x-2">
                              <div className={cn("w-2 h-2 rounded-full", p.stock < 20 ? "bg-red-500 animate-pulse" : "bg-green-500")}></div>
                              <span className="text-sm font-bold">{p.stock}</span>
                           </div>
                        </td>
                        <td className="py-6 text-right font-serif font-bold text-sm">
                          {formatPKR(p.price)}
                        </td>
                        <td className="py-6 text-right">
                          <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-zinc-400 hover:text-brand-gold transition-colors"><Edit size={16} /></button>
                            <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-brand-black rounded-[3rem] p-10 border border-brand-black/5 shadow-sm space-y-8">
              <h3 className="text-2xl font-serif font-bold uppercase flex items-center gap-4">
                <TrendingUp size={24} className="text-brand-gold" />
                Live Feed
              </h3>
              
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-100 dark:bg-zinc-900"></div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative flex items-start space-x-6 pl-10">
                    <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-brand-gold border-2 border-white dark:border-brand-black z-10"></div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-tight uppercase">New Sale Confirmed</p>
                      <p className="text-[10px] text-zinc-500">Order #ABC-8822 by Zehra K.</p>
                      <p className="text-[10px] font-bold text-brand-gold">12:34 PM</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-zinc-50 dark:bg-zinc-900 py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-zinc-100 transition-all group">
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Analytics</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-brand-black text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-700"><Package size={120} /></div>
               <div className="relative z-10 space-y-6">
                 <div className="flex items-center space-x-3 text-brand-gold">
                    <AlertCircle size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Priority Alert</span>
                 </div>
                 <h4 className="text-2xl font-serif italic">Inventory Low: Streetwear Collection</h4>
                 <p className="text-xs text-zinc-400">4 items are currently below safety threshold. Restock recommended for upcoming seasonal trend.</p>
                 <button className="bg-white text-brand-black w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-gold hover:text-white transition-all">Review Hub</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
