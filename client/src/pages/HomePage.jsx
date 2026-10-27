import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  Headphones,
  Sparkles,
  Crown,
  FileText,
} from 'lucide-react';
import { getFeaturedProducts } from '../services/productService';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import OrnamentalDivider from '../components/common/OrnamentalDivider';
import GaneshaEmblem from '../components/common/GaneshaLogo';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO, buildOrganizationSchema, buildWebSiteSchema } from '../utils/seoConfig';
import { trackQuotationClick, trackWhatsAppEnquiry } from '../services/analytics';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { getWhatsAppLink } = useSettings();
  const { language, isBilingual, getLocalizedProduct, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getFeaturedProducts();
        if (res.data) setFeaturedProducts(res.data);
      } catch (err) {
        console.error('Failed to load products from API:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
    window.scrollTo(0, 0);
  }, []);

  // All 6 Product Categories (Identical Round Medallion Design)
  const productCategories = [
    {
      id: 'prabavalayam',
      nameKey: 'categories.prabavalayam',
      descKey: 'categories.prabavalayamDesc',
      image: '/images/cat_prabavalayam.jpg',
      link: '/categories?category=prabavalayam',
      imageClass: 'object-cover',
    },
    {
      id: 'kalasam',
      nameKey: 'categories.kalasam',
      descKey: 'categories.kalasamDesc',
      image: '/images/cat_kalasam.jpg',
      link: '/categories?category=kalasam',
      imageClass: 'object-cover',
    },
    {
      id: 'temple-flag-pole',
      nameKey: 'categories.templeFlagPole',
      descKey: 'categories.templeFlagPoleDesc',
      image: '/images/cat_kodimaram.jpg',
      link: '/categories?category=temple-flag-pole',
      imageClass: 'object-cover',
    },
    {
      id: 'temple-bell',
      nameKey: 'categories.templeBell',
      descKey: 'categories.templeBellDesc',
      image: '/images/cat_temple_bell.jpg',
      link: '/categories?category=temple-bell',
      imageClass: 'object-cover',
    },
    {
      id: 'kavacham',
      nameKey: 'categories.kavacham',
      descKey: 'categories.kavachamDesc',
      image: '/images/real_kavacham.jpg',
      link: '/categories?category=kavacham',
      imageClass: 'object-cover object-[center_28%]',
    },
    {
      id: 'deity-idols',
      nameKey: 'categories.deityIdols',
      descKey: 'categories.deityIdolsDesc',
      image: '/images/deityidols.jpg',
      link: '/categories?category=deity-idols',
      imageClass: 'object-cover object-top',
    },
  ];

  // 4 Featured Products with Authentic Workshop Photographs
  const featuredProductsList = [
    {
      id: 'fp-prabavalayam',
      nameKey: 'featuredProducts.prod1Name',
      descKey: 'featuredProducts.prod1Desc',
      descEnKey: 'featuredProducts.prod1DescEn',
      productCode: 'SSVM-PB-001',
      image: '/images/prabavalayam_featured.jpg',
      slug: 'grand-makara-torana-brass-prabavalayam',
    },
    {
      id: 'fp-hanuman-vahana',
      nameKey: 'featuredProducts.prod2Name',
      descKey: 'featuredProducts.prod2Desc',
      descEnKey: 'featuredProducts.prod2DescEn',
      productCode: 'SSVM-HV-001',
      image: '/images/hanuman_vahana.png',
      slug: 'traditional-temple-hanuman-vahana-brass-sculpture',
    },
    {
      id: 'fp-kovil-vaasal',
      nameKey: 'featuredProducts.prod3Name',
      descKey: 'featuredProducts.prod3Desc',
      descEnKey: 'featuredProducts.prod3DescEn',
      productCode: 'SSVM-KV-001',
      image: '/images/temple_entrance_vaasal.jpg',
      slug: 'traditional-temple-entrance-kovil-vaasal-thiruppani',
    },
    {
      id: 'fp-simhasanam-vahana',
      nameKey: 'featuredProducts.prod4Name',
      descKey: 'featuredProducts.prod4Desc',
      descEnKey: 'featuredProducts.prod4DescEn',
      productCode: 'SSVM-VH-001',
      image: '/images/simhasanam_vahana.jpg',
      slug: 'ornate-brass-simhasanam-lion-vahana-throne',
    },
  ];

  // 4 Core Value Propositions for Running Marquee
  const valuePropositions = [
    {
      id: 'safe-delivery',
      icon: Truck,
      titleKey: 'features.safeDeliveryTitle',
      subtitleKey: 'features.safeDeliverySubtitle',
      descKey: 'features.safeDeliveryDesc',
    },
    {
      id: 'factory-price',
      icon: ShieldCheck,
      titleKey: 'features.factoryPriceTitle',
      subtitleKey: 'features.factoryPriceSubtitle',
      descKey: 'features.factoryPriceDesc',
    },
    {
      id: 'support',
      icon: Headphones,
      titleKey: 'features.supportTitle',
      subtitleKey: 'features.supportSubtitle',
      descKey: 'features.supportDesc',
    },
    {
      id: 'craft-quality',
      icon: Sparkles,
      titleKey: 'features.craftQualityTitle',
      subtitleKey: 'features.craftQualitySubtitle',
      descKey: 'features.craftQualityDesc',
    },
  ];

  return (
    <div className="bg-[#FAF6ED] font-sans antialiased">
      <SEOHead
        {...PAGE_SEO.home}
        schema={[buildOrganizationSchema(), buildWebSiteSchema()]}
      />

      {/* 1. HERO PRODUCT CATEGORIES SECTION */}
      <section id="our-categories" className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 overflow-hidden">
        {/* Faded Temple Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/temple_categories_bg.jpg"
            alt="South Indian Temple Gopuram Background - Sri Shakthi Vinayaga Metals"
            width="1920"
            height="1080"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover object-[center_35%] opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/80 via-transparent to-[#FAF6ED]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <div className="mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#D5B573]" />
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A15B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3C11.5 5.5 9.5 8.5 7 10C8.5 12 11 13 12 15C13 13 15.5 12 17 10C14.5 8.5 12.5 5.5 12 3Z" />
                <path d="M6 11C4 12.5 3 15 3.5 17C6 17 8 15.5 9 13.5C8 12.5 7 11.5 6 11Z" opacity="0.8" />
                <path d="M18 11C20 12.5 21 15 20.5 17C18 17 16 15.5 15 13.5C16 12.5 17 11.5 18 11Z" opacity="0.8" />
                <path d="M7 17.5C9 19 11 19.5 12 19.5C13 19.5 15 19 17 17.5C15 18.5 13 18.5 12 18.5C11 18.5 9 18.5 7 17.5Z" opacity="0.6" />
              </svg>
              <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#D5B573]" />
            </div>

            {/* Primary H1: Clear, Descriptive, Bilingual-Friendly */}
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#8B1E28] tracking-tight">
              {isBilingual ? (
                <>
                  <span className="font-tamil block text-xl sm:text-2xl lg:text-3xl font-bold mb-1 leading-tight">
                    ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் — திருக்கோவில் பாரம்பரிய உலோகத் தயாரிப்புகள்
                  </span>
                  <span className="block text-base sm:text-xl lg:text-2xl font-serif text-[#380E1B] tracking-wide">
                    Sri Shakthi Vinayaga Metals | Temple Metal Products Manufacturer
                  </span>
                </>
              ) : (
                <span>Sri Shakthi Vinayaga Metals | Temple Metal Products Manufacturer</span>
              )}
            </h1>

            <h2 className="font-serif font-bold text-xs sm:text-sm text-[#262321] tracking-[0.2em] uppercase">
              {t('categories.subtitle')}
            </h2>
            <OrnamentalDivider />
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
              {t('categories.tagline')}
            </p>
          </div>

          {/* 6 Sacred Categories: Circular Medallion Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 max-w-7xl mx-auto justify-center mb-10">
            {productCategories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.link}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-[3px] border-white p-1 bg-white shadow-xl ring-2 ring-gold-500/70 group-hover:ring-[#8B1E28] group-hover:shadow-temple group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-beige-light flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={`${t(cat.nameKey)} - Traditional Temple Metalwork Tiruppur`}
                      width="160"
                      height="160"
                      loading="eager"
                      className={`w-full h-full group-hover:scale-110 transition-transform duration-500 ${cat.imageClass || 'object-cover'}`}
                    />
                  </div>
                </div>

                <div className="mt-3.5 space-y-0.5">
                  <span className="font-serif font-bold text-xs sm:text-sm md:text-base text-[#8B1E28] group-hover:text-maroon-900 transition-colors block drop-shadow-xs leading-tight">
                    {t(cat.nameKey)}
                  </span>
                  <span className="text-[11px] text-charcoal-muted block leading-snug">
                    {t(cat.descKey)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Core Specialization Highlight Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-gold-600/40 max-w-4xl mx-auto shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-full bg-maroon-50 text-[#8B1E28] flex items-center justify-center shrink-0 border border-gold-600/40 shadow-xs">
                <Crown className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#8B1E28] block">
                  {t('categories.coreFocusNotice')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/request-quote"
                className="px-4 py-2 bg-[#8B1E28] hover:bg-maroon-900 text-gold-300 text-xs font-semibold rounded shadow transition-colors text-center font-serif"
              >
                <span>{t('common.requestQuotation')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Space and Breathing Gap between Categories and Video */}
      <div className="py-6 sm:py-8 md:py-10 flex items-center justify-center gap-3 bg-[#FAF6ED]">
        <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#D5B573]" />
        <span className="w-2 h-2 rotate-45 bg-[#ECC976] border border-[#A67C2E]" />
        <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#D5B573]" />
      </div>

      {/* 2. FULL CRAFTSMANSHIP VIDEO SECTION - NON-CLICKABLE, AUTOPLAY, ONLY VIDEO */}
      <section className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px] xl:h-[720px] bg-[#140308] overflow-hidden shadow-xl border-y border-[#D5B573]/25 select-none pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_banner.jpg"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source src="/gemini_generated_video_15578484.mp4" type="video/mp4" />
          <img
            src="/images/hero_banner.jpg"
            alt="Sri Shakthi Vinayaga Metals Master Craftsmanship"
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </video>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="relative py-12 sm:py-16 bg-[#FAF6ED] border-y border-gold-600/20 overflow-hidden">
        {/* Temple Architecture Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/temple_categories_bg.jpg"
            alt="South Indian Temple Gopuram Background"
            className="w-full h-full object-cover object-[center_35%] opacity-35 sm:opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/70 via-transparent to-[#FAF6ED]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Products Header */}
          <div className="mb-10 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center">
            {/* Left spacer on desktop */}
            <div className="hidden xl:block" />

            {/* Centered heading */}
            <div className="min-w-0 text-center space-y-1">
              <OrnamentalDivider />
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#8B1E28] tracking-tight break-words">
                {t('featuredProducts.title')}
              </h2>
              <h3 className="font-serif font-semibold text-xs sm:text-sm text-[#262321] tracking-wider uppercase">
                {t('featuredProducts.subtitle')}
              </h3>
              <OrnamentalDivider />
            </div>

            {/* View All Button — separate column */}
            <div className="flex justify-center xl:justify-end xl:pl-4">
              <Link
                to="/products"
                className="inline-flex max-w-full items-center justify-center gap-1.5 rounded-full border border-gold-600/70 bg-white hover:bg-gold-50 px-3 sm:px-4 py-2 text-xs font-serif font-semibold text-[#8B1E28] shadow-sm transition-colors text-center"
              >
                <span>{t('featuredProducts.viewAll')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* 4 Featured Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProductsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden border border-gold-600/30 shadow-xs hover:shadow-card-elevated hover:border-gold-600/60 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Product Image Container with object-contain to prevent cropping */}
                <div className="relative aspect-[4/3] bg-[#FAF6ED] overflow-hidden flex items-center justify-center p-3 border-b border-gold-600/20">
                  <img
                    src={item.image}
                    alt={`${t(item.nameKey)} (${item.productCode}) - Sri Shakthi Vinayaga Metals Tiruppur`}
                    width="400"
                    height="300"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#380E1B]/90 text-gold-300 font-mono text-[10px] px-2 py-0.5 rounded border border-gold-500/30 shadow-xs">
                    {item.productCode}
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#8B1E28] group-hover:text-maroon-900 transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-center">
                      {t(item.nameKey)}
                    </h3>

                    <div className="w-8 h-[1px] bg-gold-600/40 my-2.5" />

                    {/* Bilingual or Localized Description */}
                    {isBilingual ? (
                      <div className="space-y-1 mb-4">
                        <p className="font-tamil text-xs text-[#51463E] leading-relaxed line-clamp-2">
                          {t(item.descKey)}
                        </p>
                        <p className="font-serif text-[11px] text-[#7A6B63] italic leading-relaxed line-clamp-2">
                          {t(item.descEnKey)}
                        </p>
                      </div>
                    ) : (
                      <p className="font-serif text-xs text-[#51463E] leading-relaxed line-clamp-3 mb-4">
                        {t(item.descKey)}
                      </p>
                    )}
                  </div>

                  {/* Actions: View Details & Request Quotation Buttons */}
                  <div className="space-y-2 pt-3 border-t border-gold-600/20 mt-auto">
                    <Link
                      to={`/products/${item.slug}`}
                      onClick={() => trackQuotationClick(t(item.nameKey), item.productCode, 'home_featured_view')}
                      className="w-full py-2 px-3 rounded border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white text-xs font-semibold flex items-center justify-center transition-colors text-center"
                    >
                      {t('featuredProducts.viewDetailsBtn')}
                    </Link>
                    <Link
                      to={`/request-quote?product=${encodeURIComponent(t(item.nameKey))}&code=${encodeURIComponent(item.productCode)}`}
                      onClick={() => trackQuotationClick(t(item.nameKey), item.productCode, 'home_featured_quote')}
                      className="w-full py-2 px-3 rounded bg-gold-600 hover:bg-gold-500 text-maroon-950 text-xs font-semibold flex items-center justify-center transition-colors text-center shadow-xs"
                    >
                      {t('featuredProducts.requestQuoteBtn')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION STRIP - CONTINUOUS RUNNING MARQUEE */}
      <section className="relative bg-white py-6 border-y border-gold-600/30 shadow-xs overflow-hidden">
        {/* Subtle Left and Right Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Continuous Running Marquee Track (4x duplicate for seamless infinite loop) */}
        <div className="flex animate-running-marquee items-center gap-5 sm:gap-6 py-1">
          {[...valuePropositions, ...valuePropositions, ...valuePropositions, ...valuePropositions].map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={`${feat.id}-${index}`}
                className="flex items-center gap-3.5 sm:gap-4 px-5 py-3.5 bg-[#FAF6ED]/70 border border-gold-600/30 hover:border-[#8B1E28] hover:bg-white rounded-xl shadow-xs transition-all shrink-0 min-w-[280px] sm:min-w-[340px] max-w-[380px]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-maroon-50 text-[#8B1E28] border border-gold-600/30 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B1E28]" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#8B1E28] leading-tight">
                    {t(feat.titleKey)}
                  </h4>
                  <p className="text-[11px] font-semibold text-charcoal mt-0.5 leading-tight">
                    {t(feat.subtitleKey)}
                  </p>
                  <p className="text-[10px] text-charcoal-muted line-clamp-2 mt-0.5 leading-snug">
                    {t(feat.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gold-600/30 p-6 sm:p-10 shadow-card-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Divine Lord Vinayagar (Ganesha) Artwork */}
            <div className="lg:col-span-4">
              <div className="relative rounded-xl overflow-hidden border border-gold-600/30 shadow-md bg-[#FAF6ED] aspect-[3/4] sm:aspect-[4/5]">
                <img
                  src="/images/about_ganesha.jpg"
                  alt="Sri Shakthi Vinayaga - Divine Lord Ganesha"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Center: Story */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div>
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#8B1E28] leading-tight">
                  {t('about.heroTitle')}
                </h2>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#262321] tracking-wide mt-0.5">
                  {t('about.heroSubtitle')}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-charcoal leading-relaxed text-justify">
                {t('about.storyParagraph1')}
              </p>

              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed text-justify">
                {t('about.storyParagraph2')}
              </p>

              {/* Learn More Button */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded bg-[#8B1E28] hover:bg-maroon-900 text-white font-medium text-xs shadow transition-colors font-serif"
                >
                  <span>{t('nav.about')}</span>
                  <span className="text-gold-300">→</span>
                </Link>
              </div>
            </div>

            {/* Right: Golden Ganesha Emblem & Blessings */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center p-6 border-t lg:border-t-0 lg:border-l border-gold-600/20 space-y-3">
              <GaneshaEmblem className="w-24 h-24 sm:w-28 sm:h-28" />

              <div className="space-y-1">
                <span className="font-serif font-bold text-sm text-[#8B1E28] block">
                  {t('about.blessingTitle')}
                </span>
                <span className="text-[11px] text-charcoal-muted font-serif block">
                  {t('about.blessingSubtitle')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
