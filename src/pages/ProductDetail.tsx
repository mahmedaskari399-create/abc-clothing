import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Heart, Star, Truck, ShieldCheck, 
  RefreshCw, ChevronLeft, ChevronRight, Share2, 
  Check, Info, MessageSquare, Plus, Minus
} from 'lucide-react';
import { useStore } from '../StoreContext';
import { ProductCard } from '../components/ProductCard';
import { formatPKR, cn } from '../lib/utils';
import { PAKISTAN_CITIES } from '../constants';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  // Related products
  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  if (!product) return (
    <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-serif">Product Not Found</h1>
      <Link to="/shop" className="text-brand-gold font-bold">Back to Collections</Link>
    </div>
  );

  // Initialize selections
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    // Visual feedback normally here
  };

  return (
    <div className="bg-white dark:bg-brand-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-8">
          <Link to="/" className="hover:text-brand-gold">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-gold">Collections</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-gold">{product.category}</Link>
          <span>/</span>
          <span className="text-brand-black dark:text-white truncate max-w-[150px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.images[activeImg]}
                  src={product.images[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-3 bg-white/80 dark:bg-black/80 rounded-full hover:bg-white dark:hover:bg-black transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setActiveImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-3 bg-white/80 dark:bg-black/80 rounded-full hover:bg-white dark:hover:bg-black transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    activeImg === i ? "border-brand-gold scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{product.category}</p>
                  <h1 className="text-4xl font-serif font-bold">{product.name}</h1>
                </div>
                <button className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-brand-black dark:text-white">{product.rating}</span>
                </div>
                <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
                <button className="text-sm text-zinc-500 hover:text-brand-gold flex items-center space-x-1">
                  <MessageSquare size={14} />
                  <span>{12} Reviews</span>
                </button>
              </div>

              <p className="text-3xl font-serif font-bold">{formatPKR(product.price)}</p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                {product.description}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-6">
              {/* Color Selector */}
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-4">Color: <span className="text-brand-gold">{selectedColor}</span></p>
                <div className="flex space-x-4">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 p-1.5 transition-all flex items-center justify-center",
                        selectedColor === color.name ? "border-brand-gold scale-110" : "border-transparent"
                      )}
                      title={color.name}
                    >
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}>
                        {selectedColor === color.name && <Check size={14} className={cn(color.hex === '#000000' || color.hex === '#141414' ? "text-white" : "text-black")} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs uppercase tracking-widest font-bold">Select Size</p>
                  <button className="text-xs text-zinc-500 underline flex items-center gap-1">
                    <Info size={12} /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 border transition-all flex items-center justify-center font-bold text-sm rounded-lg",
                        selectedSize === size 
                          ? "bg-brand-black text-white dark:bg-white dark:text-brand-black border-brand-black dark:border-white scale-[1.02] shadow-lg" 
                          : "border-zinc-200 dark:border-zinc-800 hover:border-brand-gold"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-6">
                <p className="text-xs uppercase tracking-widest font-bold">Quantity</p>
                <div className="flex items-center space-x-4 bg-zinc-50 dark:bg-zinc-900 rounded-full px-2 py-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-white dark:hover:bg-brand-black rounded-full transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1.5 hover:bg-white dark:hover:bg-brand-black rounded-full transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className={cn("text-xs font-bold", product.stock < 10 ? "text-red-500" : "text-green-500")}>
                  {product.stock < 10 ? `Only ${product.stock} left!` : 'In Stock'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-brand-gold text-white h-16 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-gold/20"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Bag</span>
                </button>
                <button className="w-16 h-16 border-2 border-zinc-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* Delivery/Tabs */}
            <div className="pt-8 border-t border-brand-black/5 dark:border-white/5 space-y-8">
              <div className="flex space-x-8 border-b border-brand-black/5 dark:border-white/5">
                {(['details', 'materials', 'shipping'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                      activeTab === tab ? "text-brand-gold" : "text-zinc-500"
                    )}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold" />}
                  </button>
                ))}
              </div>

              <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[100px]">
                {activeTab === 'details' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Premium heavy-weight construction</li>
                    <li>Designed for a modern oversized fit</li>
                    <li>Signature ABC CLOTHING detailing</li>
                    <li>Available in limited quantities</li>
                  </ul>
                )}
                {activeTab === 'materials' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li>100% Organic Pima Cotton</li>
                    <li>Sustainability sourced from Pakistan's textile hubs</li>
                    <li>Eco-friendly low-impact dyes</li>
                    <li>Nickel-free hardware components</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <p>Free express delivery on orders over PKR 10,000.</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                      {PAKISTAN_CITIES.slice(0, 6).map(city => (
                        <div key={city} className="flex items-center gap-2">
                          <Check size={12} className="text-green-500" />
                          <span>Delivers to {city}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4 py-8">
              <div className="flex flex-col items-center text-center space-y-2 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                <Truck size={20} className="text-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Fast Hub Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                <ShieldCheck size={20} className="text-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                <RefreshCw size={20} className="text-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Easy Exchanges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="py-24 border-t border-brand-black/5 dark:border-white/5 mt-12">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl font-serif font-bold text-center">Customer Reviews</h2>
            <div className="space-y-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-500">U</div>
                      <div>
                        <p className="font-bold">User_{i}</p>
                        <div className="flex text-brand-gold"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500">2 days ago</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">Excellent fit and the material feels truly premium. I've tried many luxury brands and ABC Clothing stands right up there with the best of them. Highly recommended!</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-24 border-t border-brand-black/5 dark:border-white/5">
          <h2 className="text-3xl font-serif font-bold mb-12">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
