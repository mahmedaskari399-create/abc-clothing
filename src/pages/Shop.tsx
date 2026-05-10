import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronDown, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import { useStore } from '../StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { cn, formatPKR } from '../lib/utils';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, language } = useStore();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filters state
  const categoryFilter = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchSize = selectedSizes.length === 0 || selectedSizes.some(s => p.sizes.includes(s));
      
      return matchCategory && matchSearch && matchPrice && matchSize;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.newArrival ? 1 : -1;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [products, categoryFilter, searchQuery, priceRange, selectedSizes, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, 20000]);
    setSelectedSizes([]);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Categories</h3>
        <div className="flex flex-col space-y-2">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSearchParams(prev => {
                  if (cat === 'All') prev.delete('category');
                  else prev.set('category', cat);
                  return prev;
                });
              }}
              className={cn(
                "text-left text-sm py-1.5 transition-colors",
                categoryFilter === cat ? "text-brand-gold font-bold" : "text-zinc-500 hover:text-brand-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Price Range</h3>
        <input 
          type="range" 
          min="0" 
          max="20000" 
          step="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-brand-gold"
        />
        <div className="flex justify-between text-xs font-bold mt-2 font-serif">
          <span>{formatPKR(priceRange[0])}</span>
          <span>{formatPKR(priceRange[1])}</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                "h-10 text-[10px] font-bold border rounded flex items-center justify-center transition-all",
                selectedSizes.includes(size) 
                  ? "bg-brand-black text-white dark:bg-white dark:text-brand-black border-brand-black dark:border-white" 
                  : "border-zinc-200 dark:border-zinc-800 hover:border-brand-gold"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] border-b border-brand-gold inline-block"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-brand-black min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-tight">
              {categoryFilter === 'All' ? 'Our Collections' : categoryFilter}
            </h1>
            <p className="text-sm text-zinc-500 mt-2">{filteredProducts.length} Products Found</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchParams(prev => {
                  if (e.target.value) prev.set('search', e.target.value);
                  else prev.delete('search');
                  return prev;
                })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-brand-black/5 dark:border-white/5 rounded-full py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
            
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full"
            >
              <Filter size={20} />
            </button>

            <div className="hidden lg:flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-3">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sm font-bold outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <FilterContent />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <SearchIcon size={64} className="text-zinc-200" />
                <h2 className="text-2xl font-serif">No products found matching your criteria.</h2>
                <button 
                  onClick={clearFilters}
                  className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-8 py-3 rounded-full font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-brand-black z-[70] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif font-bold uppercase">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 border rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <FilterContent />
              </div>
              <div className="pt-8 border-t border-brand-black/5 dark:border-white/5 space-y-4">
                <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sort By:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-sm font-bold flex-grow outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">New Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-brand-black dark:bg-white text-white dark:text-brand-black py-4 rounded-full font-bold uppercase tracking-widest"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
