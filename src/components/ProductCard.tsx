import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, cn } from '../lib/utils';
import { useStore } from '../StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.newArrival && (
            <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">New</span>
          )}
          {product.trending && (
            <span className="bg-brand-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Hot</span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: product.sizes[0],
                color: product.colors[0].name,
                quantity: 1
              });
            }}
            className="p-3 bg-white text-brand-black rounded-full hover:bg-brand-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
          >
            <ShoppingBag size={20} />
          </button>
          <button className="p-3 bg-white text-brand-black rounded-full hover:bg-pink-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75">
            <Heart size={20} />
          </button>
        </div>
      </Link>

      <div className="mt-4 space-y-1 text-center">
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block text-sm font-medium hover:text-brand-gold transition-colors truncate">
          {product.name}
        </Link>
        <div className="flex items-center justify-center space-x-1 py-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={cn(i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-zinc-300 dark:text-zinc-700")} />
          ))}
          <span className="text-[10px] text-zinc-400">({product.rating})</span>
        </div>
        <p className="font-serif font-bold text-lg">{formatPKR(product.price)}</p>
        
        {/* Colors */}
        <div className="flex justify-center space-x-1.5 mt-2">
          {product.colors.map((color, i) => (
            <div 
              key={i} 
              className="w-3 h-3 rounded-full border border-black/10 dark:border-white/10 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
