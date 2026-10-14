import React from 'react';
import { SearchX, RefreshCcw } from 'lucide-react';

const EmptyState = ({
  title = 'No Products Found',
  message = 'We could not find any products matching your selected criteria. Try adjusting your search or filters.',
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gold-600/30 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
      <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-600/30">
        <SearchX className="w-8 h-8 text-gold-700" />
      </div>
      <h3 className="font-serif font-bold text-lg text-charcoal">{title}</h3>
      <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-400 font-semibold text-xs rounded transition-colors"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
