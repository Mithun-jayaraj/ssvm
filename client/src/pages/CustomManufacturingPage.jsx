import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Flame,
  Shield,
  Bell,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import OrnamentalDivider from '../components/common/OrnamentalDivider';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO, buildBreadcrumbSchema } from '../utils/seoConfig';

const CustomManufacturingPage = () => {
  const { getWhatsAppLink } = useSettings();
  const { isBilingual, t, getWhatsAppMessage } = useLanguage();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Custom Manufacturing', url: '/custom-manufacturing' },
  ];

  const pillars = [
    {
      icon: Crown,
      title: t('customMfg.pillar1Title'),
      subtitle: isBilingual ? t('customMfg.pillar1Subtitle') : '',
      description: t('customMfg.pillar1Desc'),
      material: t('customMfg.pillar1Material'),
    },
    {
      icon: Flame,
      title: t('customMfg.pillar2Title'),
      subtitle: isBilingual ? t('customMfg.pillar2Subtitle') : '',
      description: t('customMfg.pillar2Desc'),
      material: t('customMfg.pillar2Material'),
    },
    {
      icon: Shield,
      title: t('customMfg.pillar3Title'),
      subtitle: isBilingual ? t('customMfg.pillar3Subtitle') : '',
      description: t('customMfg.pillar3Desc'),
      material: t('customMfg.pillar3Material'),
    },
    {
      icon: Bell,
      title: t('customMfg.pillar4Title'),
      subtitle: isBilingual ? t('customMfg.pillar4Subtitle') : '',
      description: t('customMfg.pillar4Desc'),
      material: t('customMfg.pillar4Material'),
    },
  ];

  const processStepIndices = [0, 1, 2, 3];

  return (
    <div className="relative bg-[#FAF6ED] min-h-screen py-10 font-sans overflow-hidden">
      <SEOHead
        {...PAGE_SEO.customManufacturing}
        schema={[buildBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Faded Temple Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/temple_categories_bg.jpg"
          alt="South Indian Temple Gopuram Background - Sri Shakthi Vinayaga Metals"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-[center_25%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/80 via-[#FAF6ED]/30 to-[#FAF6ED]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-charcoal-muted">
          <Link to="/" className="hover:text-maroon-800">
            {isBilingual ? (
              <>
                <span className="font-tamil">முகப்பு</span> | Home
              </>
            ) : (
              <span>{t('nav.home')}</span>
            )}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
          <span className="font-semibold text-maroon-800">
            {isBilingual ? 'தனிப்பயன் தயாரிப்பு | Custom Manufacturing' : t('customMfg.heroEyebrow')}
          </span>
        </nav>
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            {t('customMfg.heroEyebrow')}
          </span>
          <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#8B1E28]">
            {t('customMfg.heroTitle')}
          </h1>
          <h2 className="font-serif font-bold text-sm sm:text-lg text-[#262321] tracking-wide">
            {t('customMfg.heroSubtitle')}
          </h2>
          <OrnamentalDivider />
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            {t('customMfg.heroDescription')}
          </p>
        </div>

        {/* 4 Pillars of Custom Work: Prabavalayam, Kalasam, Kodimaram, Bells */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs flex flex-col justify-between space-y-4 hover:border-gold-500 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#8B1E28] leading-tight">
                    {pillar.title}
                  </h3>
                  {pillar.subtitle && (
                    <h4 className="font-serif font-medium text-xs text-charcoal mb-2">
                      {pillar.subtitle}
                    </h4>
                  )}
                  <p className="text-xs text-charcoal-muted leading-relaxed mt-2">
                    {pillar.description}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-gold-700 block border-t border-gold-600/20 pt-2">
                  {pillar.material}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sthapati Workflow Process */}
        <div className="bg-white rounded-2xl border border-gold-600/30 p-8 sm:p-12 shadow-card-elevated space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
              {t('process.eyebrow')}
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#8B1E28]">
              {t('process.title')}
            </h3>
            <h4 className="font-serif font-medium text-xs sm:text-sm text-charcoal">
              {t('process.subtitle')}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processStepIndices.map((idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-beige-light/70 border border-gold-600/20 space-y-2 hover:border-gold-500/50 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-[#8B1E28] text-gold-300 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h5 className="font-serif font-bold text-xs text-[#8B1E28]">
                  {t(`process.steps.${idx}.title`)}
                </h5>
                <p className="text-[11px] text-charcoal-muted leading-relaxed">
                  {t(`process.steps.${idx}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#2B0711] via-[#4A1424] to-[#2B0711] text-white border-2 border-gold-600/40 shadow-card-elevated flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-serif font-extrabold text-xl sm:text-2xl text-gold-300">
              {t('customMfg.ctaTitle')}
            </h4>
            <p className="font-serif font-medium text-sm sm:text-base text-white/90">
              {t('customMfg.ctaSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Link
              to="/request-quote"
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-xs rounded shadow transition-all"
            >
              <span className="block">{t('common.requestQuotation')}</span>
            </Link>

            <a
              href={getWhatsAppLink(getWhatsAppMessage(null, 'Custom Manufacturing Enquiry'))}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs rounded flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('common.chatWhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomManufacturingPage;
