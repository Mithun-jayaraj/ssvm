import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, FileText, ShoppingBag } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { useLanguage } from '../../context/LanguageContext';

const QuotationTrayDrawer = () => {
  const {
    quotationItems,
    removeFromQuote,
    updateQuantity,
    updateRequirements,
    clearQuote,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useQuotation();

  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleProceed = () => {
    setIsDrawerOpen(false);
    navigate('/request-quote');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6ED] text-[#262321] shadow-2xl flex flex-col border-l-2 border-gold-600">
          {/* Header */}
          <div className="p-5 bg-[#4A1424] text-white flex items-center justify-between border-b border-gold-600">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif font-bold text-lg tracking-wide text-gold-300">
                {t('common.quotationTrayTitle')}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-gold-400 hover:text-white hover:bg-maroon-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Information */}
          <div className="bg-beige-light px-5 py-2.5 border-b border-gold-600/30 text-xs text-charcoal-muted flex justify-between items-center">
            <span>
              {quotationItems.length} {t('common.itemsSelected')}
            </span>
            {quotationItems.length > 0 && (
              <button
                type="button"
                onClick={clearQuote}
                className="text-red-700 hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                <Trash2 className="w-3 h-3" />
                <span>{t('common.clearAll')}</span>
              </button>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {quotationItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-charcoal-muted">
                <ShoppingBag className="w-12 h-12 text-gold-600/50 mb-3" />
                <p className="font-serif font-semibold text-base text-charcoal">
                  {t('common.trayEmptyTitle')}
                </p>
                <p className="text-xs text-charcoal-muted mt-1 max-w-xs">
                  {t('common.trayEmptyDesc')}
                </p>
              </div>
            ) : (
              quotationItems.map((item) => (
                <div
                  key={item.product || item.productCode}
                  className="bg-white p-3.5 rounded-lg border border-gold-600/30 shadow-xs flex gap-3 relative"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded overflow-hidden bg-beige shrink-0 border border-gold-600/20">
                    <img
                      src={
                        item.image ||
                        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[10px] font-mono font-bold bg-maroon-50 text-maroon-800 px-1.5 py-0.5 rounded border border-maroon-800/20">
                      {item.productCode}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-[#262321] truncate mt-1">
                      {item.productName}
                    </h4>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] text-charcoal-muted font-medium">{t('form.quantity')}:</span>
                      <div className="flex items-center border border-gold-600/40 rounded bg-[#FAF6ED]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product || item.productCode, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-beige disabled:opacity-40"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product || item.productCode, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-beige"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Requirement note field */}
                    <input
                      type="text"
                      placeholder={t('form.dimensions')}
                      value={item.requirements || ''}
                      onChange={(e) =>
                        updateRequirements(item.product || item.productCode, e.target.value)
                      }
                      className="w-full mt-2 text-[11px] px-2 py-1 rounded bg-[#FAF6ED] border border-beige-dark text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromQuote(item.product || item.productCode)}
                    className="absolute top-2 right-2 text-charcoal-muted/60 hover:text-red-700 transition-colors p-1"
                    title={t('common.close')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with Proceed Button */}
          {quotationItems.length > 0 && (
            <div className="p-5 bg-white border-t border-gold-600/30 space-y-3">
              <div className="text-xs text-charcoal-muted leading-tight">
                {t('common.quoteNotice')}
              </div>

              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-sm rounded shadow-md flex items-center justify-center gap-2 transition-transform transform active:scale-98"
              >
                <span>{t('common.proceedQuote')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationTrayDrawer;
