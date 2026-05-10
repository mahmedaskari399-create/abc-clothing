import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, RefreshCw, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../constants';

const Home = () => {
  const { products, language } = useStore();
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/abc-hero/1920/1080" 
            alt="Hero Banner" 
            className="w-full h-full object-cover brightness-75 transition-transform duration-[10s] hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white space-y-8"
          >
            <p className="text-brand-gold font-bold tracking-[0.3em] uppercase text-sm">New Collection 2026</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1]">
              Redefining <br />
              <span className="italic text-brand-beige">Modern</span> Luxury.
            </h1>
            <p className="text-lg text-zinc-300 max-w-lg leading-relaxed">
              Explore the latest in premium streetwear and high-end fashion. Crafted for those who lead, not follow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/shop" 
                className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-white hover:text-brand-black transition-all group"
              >
                <span>SHOP NOW</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/shop?category=Streetwear" 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-white/20 transition-all"
              >
                EXPLORE STREETWEAR
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-brand-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <Truck className="text-brand-gold" size={32} />
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">Fast Shipping</p>
                <p className="text-xs text-zinc-400">Across all major cities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="text-brand-gold" size={32} />
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">Secure Payments</p>
                <p className="text-xs text-zinc-400">Encrypted transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <RefreshCw className="text-brand-gold" size={32} />
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">Easy Returns</p>
                <p className="text-xs text-zinc-400">30-day exchange policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Star className="text-brand-gold" size={32} />
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">Premium Quality</p>
                <p className="text-xs text-zinc-400">100% authentic materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white dark:bg-brand-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2">Curated for you</p>
              <h2 className="text-4xl font-serif font-bold">Shop by Category</h2>
            </div>
            <Link to="/shop" className="text-sm font-bold border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.slice(0, 4).map((cat, i) => (
              <motion.div
                key={cat}
                whileHover={{ y: -10 }}
                className="relative h-96 group overflow-hidden rounded-2xl"
              >
                <Link to={`/shop?category=${cat}`}>
                  <img 
                    src={`https://picsum.photos/seed/cat-${cat}/600/800`} 
                    alt={cat} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-1">{cat}</h3>
                    <p className="text-xs uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">Explore Collection</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-brand-gold font-bold tracking-widest uppercase text-xs">Hot this week</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Trending Now</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Sale Banner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2rem] overflow-hidden bg-brand-black text-white p-12 md:p-24 flex items-center min-h-[500px]">
            <div className="absolute inset-0">
              <img 
                src="https://picsum.photos/seed/abc-sale/1600/900" 
                alt="Sale Banner" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay"></div>
            </div>
            
            <div className="relative z-10 max-w-xl space-y-8">
              <div className="inline-block bg-brand-gold px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Limited Offer</div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold italic">Summer <br />Essential Sale</h2>
              <p className="text-xl text-zinc-300">Up to 50% OFF on selected streetwear and women's collections. Don't miss out on quality.</p>
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">24</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 font-medium">Hours</span>
                </div>
                <div className="text-4xl text-brand-gold font-light">:</div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">45</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 font-medium">Mins</span>
                </div>
                <div className="text-4xl text-brand-gold font-light">:</div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">12</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 font-medium">Secs</span>
                </div>
              </div>
              <Link 
                to="/shop?sale=true" 
                className="mt-8 bg-white text-brand-black px-10 py-4 rounded-full font-bold inline-block hover:bg-brand-gold hover:text-white transition-all transform hover:scale-105"
              >
                SHOP THE SALE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
            <h2 className="text-4xl font-serif font-bold">Fresh <span className="text-brand-gold italic">Arrivals</span></h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-full border border-brand-black/10 dark:border-white/10 text-sm font-medium hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-brand-black transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Concept */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-gold/20 to-transparent p-1 pr-6 rounded-full border border-brand-gold/20">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <Star size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">AI Powered</span>
              </div>
              <h2 className="text-5xl font-serif font-bold leading-tight">Style Intelligence <br />For Your Wardrobe</h2>
              <p className="text-lg text-zinc-400">Our advanced AI analyzes your style preferences to curate the perfect outfits. Take our style quiz to get started.</p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                  <span>Virtual Try-On Concept</span>
                </li>
                <li className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                  <span>Personalized Fit Recommendations</span>
                </li>
                <li className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                  <span>Exclusive Early Access</span>
                </li>
              </ul>
              <button className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                CTA: START STYLE QUIZ
              </button>
            </div>
            
            <div className="relative group">
              <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/abc-ai/1200/800" 
                  alt="AI Feature" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20"
                  >
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-6 text-center">
                <div className="flex justify-center space-x-1 text-brand-gold">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <blockquote className="text-lg font-medium italic text-zinc-700 dark:text-zinc-300">
                  "The quality of the streetwear is unmatched. ABC Clothing has become my go-to brand for minimalist but edgy pieces. Fast delivery in Islamabad too!"
                </blockquote>
                <div>
                  <p className="font-bold uppercase tracking-widest text-sm">Ahmed Khan</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Verified Buyer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
