import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, FileText, MessageCircle, Ruler, Sparkles, Check } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { useSettings } from '../../context/SettingsContext';

const ProductCard = ({ product }) => {
  const { addToQuote, quotationItems } = useQuotation();
  const { getProductWhatsAppLink } = useSettings();

  if (!product) return null;

  const isInQuote = quotationItems.some(
    (item) => item.product === product._id || item.productCode === product.productCode
  );

  const displayImage =
    product.primaryImage ||
    product.imageGallery?.find((img) => img.isPrimary)?.url ||
    product.imageGallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gold-600/30 shadow-card-elevated hover:shadow-temple transition-all duration-300 flex flex-col group">
      {/* Image Container with Consistent 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] bg-beige-light overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Product Code Badge */}
        <div className="absolute top-3 left-3 bg-[#380E1B]/90 backdrop-blur-xs text-gold-400 border border-gold-500/50 text-[11px] font-mono font-semibold px-2.5 py-1 rounded shadow">
          {product.productCode}
        </div>

        {/* Material Badge */}
        {product.material && (
          <div className="absolute top-3 right-3 bg-white/95 text-maroon-900 text-[11px] font-medium px-2 py-0.5 rounded-full border border-gold-600/30 shadow-xs">
            {product.material}
          </div>
        )}

        {/* Quick WhatsApp Action Overlay */}
        <a
          href={getProductWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-md opacity-90 group-hover:opacity-100 transition-opacity"
          title="Direct WhatsApp Enquiry for this item"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Name */}
          <span className="text-[11px] uppercase tracking-wider text-gold-700 font-bold block mb-1">
            {product.category?.name || 'Temple Product'}
          </span>

          {/* Product Name */}
          <h3 className="font-serif font-bold text-base text-[#262321] line-clamp-2 leading-snug group-hover:text-maroon-800 transition-colors">
            <Link to={`/products/${product.slug}`} title={product.name}>
              {product.name}
            </Link>
          </h3>

          {/* Dimensions / Size info */}
          {product.dimensions ? (
            <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-2">
              <Ruler className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span className="truncate">{product.dimensions}</span>
            </div>
          ) : (
            <div className="text-xs text-charcoal-muted/70 mt-2 italic">
              Custom dimensions available on enquiry
            </div>
          )}

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-beige/60 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="w-full py-2 px-3 rounded border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>

          <button
            type="button"
            onClick={() => addToQuote(product)}
            className={`w-full py-2 px-3 rounded text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isInQuote
                ? 'bg-gold-700 text-maroon-950 font-bold border border-gold-800'
                : 'bg-gold-600 hover:bg-gold-500 text-maroon-950'
            }`}
          >
            {isInQuote ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Quote</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5" />
                <span>Get Quote</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
