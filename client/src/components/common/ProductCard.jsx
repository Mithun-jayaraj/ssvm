import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Ruler, Sparkles, MessageCircle, FileText } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { trackQuotationClick, trackWhatsAppEnquiry } from '../../services/analytics';

const ProductCard = ({ product }) => {
  const { getWhatsAppLink } = useSettings();
  const { language, isBilingual, getLocalizedProduct, getLocalizedCategory, getWhatsAppMessage, t } = useLanguage();

  if (!product) return null;

  const localized = getLocalizedProduct(product);
  const localizedCat = getLocalizedCategory(product.category);

  const categoryName = (isBilingual ? localizedCat.combinedName : localizedCat.primaryName) || product.category?.name || 'Temple Metalware';

  const whatsappText = getWhatsAppMessage(product);

  const imageAlt = `${localized.combinedName || localized.primaryName} (${product.productCode || 'SSVM'}) - Sri Shakthi Vinayaga Metals Tiruppur`;

  return (
    <div className="group bg-white rounded-xl border border-gold-600/30 overflow-hidden shadow-card-hover transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 flex flex-col justify-between">
      {/* Product Image Stage */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-beige-light">
        <img
          src={product.primaryImage || '/images/cat_prabavalayam.jpg'}
          alt={imageAlt}
          width="400"
          height="400"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Product Code Badge */}
        <div className="absolute top-3 left-3 bg-[#380E1B]/90 backdrop-blur-xs text-gold-300 font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-gold-500/30 shadow-xs">
          {product.productCode}
        </div>

        {/* Direct WhatsApp Quick Enquiry Icon */}
        <a
          href={getWhatsAppLink(whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppEnquiry(localized.primaryName, product.productCode, 'product_card')}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md transition-all transform hover:scale-110"
          title={t('common.enquireWhatsApp')}
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Name */}
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold-700 font-bold block mb-1 truncate">
            {categoryName}
          </span>

          {/* Product Name: Responsive to Selected Language & Bilingual Default */}
          <h3 className="group-hover:text-maroon-800 transition-colors">
            <Link to={`/products/${product.slug}`} title={localized.primaryName}>
              <span className="font-bold text-sm sm:text-base text-[#8B1E28] block line-clamp-1 leading-snug">
                {localized.primaryName}
              </span>
              {isBilingual && localized.secondaryName && (
                <span className="font-serif font-bold text-xs text-[#262321] block line-clamp-1 mt-0.5">
                  {localized.secondaryName}
                </span>
              )}
            </Link>
          </h3>

          {/* Dimensions / Size info */}
          {product.dimensions ? (
            <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-2">
              <Ruler className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span className="truncate text-[11px]">{product.dimensions}</span>
            </div>
          ) : (
            <div className="text-[11px] text-charcoal-muted/70 mt-2 italic">
              {t('common.dimensions')}: {t('common.contactForDetails')}
            </div>
          )}

          {/* Short Description */}
          {localized.shortDesc && (
            <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
              {localized.shortDesc}
            </p>
          )}
        </div>

        {/* Action Buttons: View Details & Enquire Now */}
        <div className="mt-4 pt-3.5 border-t border-beige/60 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product.slug}`}
            onClick={() => trackQuotationClick(localized.primaryName, product.productCode, 'card_details_click')}
            className="w-full py-2 px-2.5 rounded border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors text-center"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {t('common.details')}
            </span>
          </Link>

          <Link
            to={`/request-quote?product=${encodeURIComponent(localized.combinedName)}&code=${encodeURIComponent(product.productCode || '')}`}
            onClick={() => trackQuotationClick(localized.primaryName, product.productCode, 'card_quote_click')}
            className="w-full py-2 px-2.5 rounded bg-gold-600 hover:bg-gold-500 text-maroon-950 text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-xs text-center"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {t('common.quote')}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
