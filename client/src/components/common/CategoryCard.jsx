import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CategoryCard = ({ category }) => {
  const { isBilingual, getLocalizedCategory, t } = useLanguage();

  if (!category) return null;

  const defaultImage = '/images/cat_prabavalayam.jpg';
  const localized = getLocalizedCategory(category);

  return (
    <Link
      to={`/categories?category=${category.slug}`}
      className="group relative rounded-xl overflow-hidden shadow-card-elevated hover:shadow-temple transition-all duration-300 flex flex-col h-80 border-2 border-gold-600/30 hover:border-gold-500"
    >
      {/* Background Image with Dark Maroon Vignette */}
      <div className="absolute inset-0">
        <img
          src={category.image || defaultImage}
          alt={localized.primaryName}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#260811] via-[#380E1B]/70 to-transparent"></div>
      </div>

      {/* Primary Category Banner (Core Specialization for Prabavalayam, Kalasam, Kodimaram, Bells) */}
      {category.isPrimary && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-gold-600 to-gold-700 text-maroon-950 font-serif font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded shadow flex items-center gap-1 z-10">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>
            {t('common.coreSpecialization')}
          </span>
        </div>
      )}

      {/* Product Count Pill */}
      {category.productCount !== undefined && (
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-gold-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold-600/40 z-10">
          {category.productCount} {t('common.designsCount')}
        </div>
      )}

      {/* Content at Bottom: Localized primary name & English secondary */}
      <div className="relative mt-auto p-6 text-white z-10 space-y-1">
        <div>
          <span className="font-extrabold text-2xl text-gold-300 group-hover:text-gold-200 transition-colors block drop-shadow-md leading-tight">
            {localized.primaryName}
          </span>
          {isBilingual && localized.secondaryName && (
            <span className="font-serif font-bold text-sm text-[#FAF6ED] block mt-0.5 tracking-wide drop-shadow-xs">
              {localized.secondaryName}
            </span>
          )}
        </div>

        {localized.description && (
          <p className="text-xs text-[#FAF6ED]/85 mt-2 line-clamp-2 leading-relaxed">
            {localized.description}
          </p>
        )}

        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-gold-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all duration-300">
          <span>
            {t('common.exploreProducts')}
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
