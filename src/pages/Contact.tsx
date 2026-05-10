import React from 'react';
import { motion } from 'motion/react';
import { 
  Phone, Mail, MapPin, MessageCircle, 
  Send, Clock, Instagram, Facebook, Twitter,
  ChevronRight, Globe, ArrowRight
} from 'lucide-react';
import { useStore } from '../StoreContext';

const Contact = () => {
  const { language } = useStore();

  const content = {
    EN: {
      title: "Contact Our Atelier",
      subtitle: "Experience personalized assistance from our fashion experts.",
      touch: "Get in Touch",
      visit: "Visit Us",
      support: "Live Support",
      formTitle: "Expression of Interest",
      name: "Your Name",
      email: "Email Address",
      message: "How can we assist you?",
      send: "Send Inquiry",
      whatsapp: "Chat via WhatsApp"
    },
    UR: {
      title: "رابطہ کریں",
      subtitle: "ہمارے فیشن ماہرین سے ذاتی مدد حاصل کریں۔",
      touch: "رابطہ کریں",
      visit: "ہمارا پتہ",
      support: "لائیو سپورٹ",
      formTitle: "انکوائری فارم",
      name: "آپ کا نام",
      email: "ای میل ایڈریس",
      message: "ہم آپ کی کیا مدد کر سکتے ہیں؟",
      send: "انکوائری بھیجیں",
      whatsapp: "واٹس ایپ پر میسج کریں"
    }
  };

  const t = content[language];

  return (
    <div className="bg-white dark:bg-brand-black min-h-screen transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-brand-gold/10 p-1 pr-4 rounded-full border border-brand-gold/20"
          >
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white">
              <Globe size={16} /> 
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Karachi | Lahore | Islamabad</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold italic tracking-tight">{t.title}</h1>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-400">{t.touch}</h3>
                  <p className="text-2xl font-serif font-bold">+92 (300) 000 0000</p>
                  <p className="text-sm text-zinc-500 italic">Mon - Sat: 10AM - 8PM PKT</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-400">{t.visit}</h3>
                  <p className="text-2xl font-serif font-bold italic">Corporate Hub, DHA Phase 6</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-medium">Karachi, Pakistan 75500</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                  <Mail size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-400">Digital Atelier</h3>
                  <p className="text-2xl font-serif font-bold">concierge@abcclothing.pk</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/5 dark:bg-green-500/10 p-8 rounded-[3rem] border border-green-500/20 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <MessageCircle size={100} />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t.support}</span>
                </div>
                <h4 className="text-2xl font-serif font-bold">{t.whatsapp}</h4>
                <p className="text-xs text-zinc-500 max-w-xs">{language === 'EN' ? 'Average response time: 5 minutes. Perfect for sizing queries and delivery updates.' : 'اوسط جوابی وقت: 5 منٹ۔ سائزنگ اور ڈیلیوری اپ ڈیٹس کے لیے بہترین۔'}</p>
                <a 
                  href="https://wa.me/923000000000" 
                  className="bg-green-600 text-white h-14 rounded-full px-8 font-bold uppercase tracking-widest text-xs inline-flex items-center space-x-3 hover:bg-green-500 transition-all shadow-xl shadow-green-600/20"
                >
                  <MessageCircle size={18} />
                  <span>START CHAT</span>
                </a>
              </div>
            </div>

            <div className="flex space-x-6 grayscale opacity-40 hover:opacity-100 transition-all">
               <Instagram size={20} className="hover:text-pink-500 cursor-pointer" />
               <Facebook size={20} className="hover:text-blue-600 cursor-pointer" />
               <Twitter size={20} className="hover:text-sky-400 cursor-pointer" />
               <Globe size={20} className="hover:text-brand-gold cursor-pointer" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900 p-12 rounded-[3.5rem] border border-brand-black/5 dark:border-white/5 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-[100px]"></div>
            <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2">
                  <h3 className="text-3xl font-serif font-bold uppercase italic tracking-tight">{t.formTitle}</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Our team will revert within 24 hours.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-4">{t.name}</label>
                      <input type="text" className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 px-6 border border-brand-black/5 outline-none focus:ring-1 focus:ring-brand-gold" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-4">{t.email}</label>
                      <input type="email" className="w-full bg-white dark:bg-brand-black rounded-2xl py-4 px-6 border border-brand-black/5 outline-none focus:ring-1 focus:ring-brand-gold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-4">{t.message}</label>
                      <textarea rows={5} className="w-full bg-white dark:bg-brand-black rounded-3xl py-4 px-6 border border-brand-black/5 outline-none focus:ring-1 focus:ring-brand-gold resize-none" />
                  </div>
               </div>

               <button className="bg-brand-black dark:bg-white text-white dark:text-brand-black h-16 w-full md:w-auto px-16 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-brand-gold transition-all shadow-xl shadow-brand-black/10">
                  <span>{t.send}</span>
                  <ArrowRight size={18} />
               </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <section className="mt-24 rounded-[3.5rem] overflow-hidden grayscale brightness-75 hover:grayscale-0 transition-all duration-1000 group cursor-crosshair">
           <div className="relative h-[400px] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                 <img src="https://picsum.photos/seed/abc-map/1600/600" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay"></div>
              </div>
              <div className="relative z-10 bg-white dark:bg-brand-black p-8 rounded-3xl shadow-2xl space-y-4 max-w-xs text-center border border-brand-black/10">
                 <div className="w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center mx-auto shadow-lg"><MapPin size={24} /></div>
                 <h4 className="font-serif font-bold text-xl uppercase italic">The Atelier</h4>
                 <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-widest">Global Corporate Hub, Al-Murtaza Commercial, DHA Phase 6, Karachi</p>
                 <button className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] underline">Get Directions</button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
