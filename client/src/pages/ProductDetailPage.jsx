import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Ruler,
  Scale,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  FileText,
  CheckCircle2,
  ChevronRight,
  ZoomIn,
  X,
  Share2,
  Check,
} from 'lucide-react';
import { getProductBySlug } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import { useQuotation } from '../context/QuotationContext';
import { useSettings } from '../context/SettingsContext';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToQuote, quotationItems } = useQuotation();
  const { settings, getProductWhatsAppLink } = useSettings();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getProductBySlug(slug);
        if (res.data) {
          setProduct(res.data);
          const initialImg =
            res.data.primaryImage ||
            res.data.imageGallery?.find((img) => img.isPrimary)?.url ||
            res.data.imageGallery?.[0]?.url ||
            '';
          setSelectedImage(initialImg);
          setRelatedProducts(res.relatedProducts || []);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-serif text-charcoal">Loading sacred metalware specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <h2 className="font-serif font-bold text-2xl text-maroon-900">Product Not Found</h2>
        <p className="text-sm text-charcoal-muted mt-2">
          The requested temple product could not be located or has been unpublished by the manufacturer.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block px-6 py-2.5 bg-maroon-800 text-gold-300 font-semibold text-xs rounded"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isInQuote = quotationItems.some(
    (item) => item.product === product._id || item.productCode === product.productCode
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleImmediateQuote = () => {
    addToQuote(product, 1);
    navigate('/request-quote');
  };

  const imagesList =
    product.imageGallery && product.imageGallery.length > 0
      ? product.imageGallery
      : [{ url: product.primaryImage, alt: product.name }];

  return (
    <div className="bg-[#FAF6ED] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-6">
          <Link to="/" className="hover:text-maroon-800">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
          <Link to="/products" className="hover:text-maroon-800">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
          {product.category && (
            <>
              <Link
                to={`/products?category=${product.category.slug}`}
                className="hover:text-maroon-800"
              >
                {product.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
            </>
          )}
          <span className="font-semibold text-charcoal truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-2xl border border-gold-600/30 shadow-card-elevated overflow-hidden p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image Gallery & Lightbox */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Stage */}
              <div
                className="relative aspect-square rounded-xl bg-beige-light border border-gold-600/30 overflow-hidden cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={selectedImage || product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2 rounded-full shadow opacity-80 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="absolute top-3 left-3 bg-[#380E1B]/90 backdrop-blur-xs text-gold-300 font-mono text-xs font-semibold px-2.5 py-1 rounded border border-gold-500/40">
                  {product.productCode}
                </div>
              </div>

              {/* Thumbnail Selector */}
              {imagesList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {imagesList.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(img.url)}
                      className={`w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === img.url
                          ? 'border-gold-600 shadow-md scale-102'
                          : 'border-beige hover:border-gold-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt || `Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Manufacturing Assurance Note */}
              <div className="bg-beige-light/70 p-4 rounded-xl border border-gold-600/20 text-xs text-charcoal-muted flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-charcoal block">
                    Authentic Tirupur Foundry Guarantee
                  </span>
                  <span>
                    Fabricated with virgin temple-grade metal alloys. Exact weights and metallurgical specifications confirmed with each quotation.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Specifications & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Customization Badges */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-gold-700 font-bold">
                    {product.category?.name || 'Temple Metalware'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="p-1.5 text-charcoal-muted hover:text-maroon-800 transition-colors rounded-full hover:bg-beige"
                      title="Share Product"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    {product.customizationAvailable && (
                      <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Custom Sizing Available</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-maroon-950 leading-snug">
                  {product.name}
                </h1>

                {/* Primary Highlights Bar */}
                <div className="mt-4 p-3.5 bg-beige-light/50 rounded-xl border border-gold-600/20 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-charcoal-muted block text-[11px]">Material</span>
                    <span className="font-semibold text-charcoal">{product.material || 'Cast Brass'}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-muted block text-[11px]">Dimensions</span>
                    <span className="font-semibold text-charcoal truncate block">
                      {product.dimensions || 'Custom Sized'}
                    </span>
                  </div>
                  <div>
                    <span className="text-charcoal-muted block text-[11px]">Weight</span>
                    <span className="font-semibold text-charcoal">
                      {product.weight || 'Available upon request'}
                    </span>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-serif font-semibold text-sm text-charcoal">
                    Product Description
                  </h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed">
                    {product.fullDescription || product.shortDescription}
                  </p>
                </div>

                {/* Detailed Specifications Table */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-serif font-semibold text-sm text-charcoal mb-3">
                      Technical & Iconographic Specifications
                    </h3>
                    <div className="border border-gold-600/30 rounded-lg overflow-hidden text-xs">
                      <table className="w-full">
                        <tbody className="divide-y divide-gold-600/20">
                          <tr className="bg-beige-light/40">
                            <td className="py-2.5 px-4 font-medium text-charcoal-muted w-1/3">
                              Product Code
                            </td>
                            <td className="py-2.5 px-4 font-mono font-bold text-maroon-900">
                              {product.productCode}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-4 font-medium text-charcoal-muted">Finish</td>
                            <td className="py-2.5 px-4 text-charcoal">{product.finish}</td>
                          </tr>
                          {product.specifications.map((spec, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-beige-light/20' : ''}>
                              <td className="py-2.5 px-4 font-medium text-charcoal-muted">
                                {spec.label}
                              </td>
                              <td className="py-2.5 px-4 text-charcoal">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Section */}
              <div className="pt-6 border-t border-beige space-y-3">
                <div className="text-xs text-charcoal-muted leading-tight">
                  * As a direct manufacturer, each piece is prepared with meticulous metal craft. Quotations depend on specified height, purity alloy, and current brass/copper market rates.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Primary CTA: Request Quotation */}
                  <button
                    type="button"
                    onClick={handleImmediateQuote}
                    className="w-full py-3.5 px-5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-sm rounded shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <FileText className="w-4 h-4 text-maroon-950" />
                    <span>Request a Quotation</span>
                  </button>

                  {/* Secondary CTA: WhatsApp Direct Enquiry */}
                  <a
                    href={getProductWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm rounded shadow-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>

                {/* Tray Toggle Shorthand */}
                <button
                  type="button"
                  onClick={() => addToQuote(product)}
                  className="w-full text-center text-xs text-maroon-800 hover:underline font-semibold py-1"
                >
                  {isInQuote
                    ? '✓ Item added to your multi-product quotation tray'
                    : '+ Add to multi-product quotation tray'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-charcoal">
                Related {product.category?.name || 'Temple Products'}
              </h2>
              <Link
                to={`/products?category=${product.category?.slug}`}
                className="font-serif text-xs font-semibold text-maroon-800 hover:text-gold-700"
              >
                View Category
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={selectedImage || product.primaryImage}
            alt={product.name}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border-2 border-gold-600/40"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
