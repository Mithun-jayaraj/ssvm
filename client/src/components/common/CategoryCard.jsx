import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CategoryCard = ({ category }) => {
  if (!category) return null;

  const defaultImage =
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80';

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative rounded-xl overflow-hidden shadow-card-elevated hover:shadow-temple transition-all duration-300 flex flex-col h-80 border-2 border-gold-600/30 hover:border-gold-500"
    >
      {/* Background Image with Dark Maroon Vignette */}
      <div className="absolute inset-0">
        <img
          src={category.image || defaultImage}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#260811] via-[#380E1B]/70 to-transparent"></div>
      </div>

      {/* Primary Category Banner (for Prabavalayam & Kalasam) */}
      {category.isPrimary && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-gold-600 to-gold-700 text-maroon-950 font-serif font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded shadow flex items-center gap-1 z-10">
          <Sparkles className="w-3 h-3" />
          <span>Core Specialization</span>
        </div>
      )}

      {/* Product Count Pill */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-gold-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold-600/40 z-10">
        {category.productCount || 0} {category.productCount === 1 ? 'Design' : 'Designs'}
      </div>

      {/* Content at Bottom */}
      <div className="relative mt-auto p-6 text-white z-10">
        <h3 className="font-serif font-bold text-xl text-gold-300 group-hover:text-gold-200 transition-colors tracking-wide drop-shadow-xs">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-xs text-[#FAF6ED]/80 mt-2 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gold-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all duration-300">
          <span>Explore Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
