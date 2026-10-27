import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO } from '../utils/seoConfig';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#FAF6ED] min-h-[70vh] flex items-center justify-center py-20 px-4 font-sans">
      <SEOHead {...PAGE_SEO.notFound} />
      <div className="max-w-md w-full bg-white rounded-2xl border border-gold-600/30 p-8 text-center shadow-card-elevated space-y-5">
        <div className="w-16 h-16 bg-maroon-50 text-maroon-800 rounded-full flex items-center justify-center mx-auto border border-gold-600/30 font-serif font-bold text-2xl">
          404
        </div>
        <div className="space-y-1">
          <h1 className="font-serif font-extrabold text-2xl text-[#8B1E28]">
            {t('notFound.title')}
          </h1>
          <h2 className="font-serif font-medium text-sm text-charcoal">
            {t('notFound.subtitle')}
          </h2>
        </div>
        <p className="text-xs text-charcoal-muted leading-relaxed">
          {t('notFound.message')}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-serif font-semibold text-xs rounded flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t('notFound.returnHome')}</span>
          </Link>

          <Link
            to="/categories"
            className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-maroon-950 font-serif font-semibold text-xs rounded flex items-center justify-center gap-1.5 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>{t('notFound.browseCatalogue')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
