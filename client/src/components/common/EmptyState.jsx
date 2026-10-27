import React from 'react';
import { SearchX, RefreshCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const EmptyState = ({
  title,
  message,
  onReset,
}) => {
  const { t } = useLanguage();

  const displayTitle = title || t('common.emptyProductsTitle');
  const displayMessage = message || t('common.emptyProductsMessage');
  const resetLabel = t('common.resetFilters');

  return (
    <div className="bg-white rounded-xl border border-gold-600/30 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
      <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-600/30">
        <SearchX className="w-8 h-8 text-gold-700" />
      </div>
      <h3 className="font-serif font-bold text-lg text-charcoal">{displayTitle}</h3>
      <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">{displayMessage}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-400 font-semibold text-xs rounded transition-colors"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>{resetLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
