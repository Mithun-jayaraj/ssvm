import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import OrnamentalDivider from '../components/common/OrnamentalDivider';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO, buildBreadcrumbSchema } from '../utils/seoConfig';

// 1. South Indian Temple Gopuram Line Icon (Antique Gold #BD9546)
const GopuramLineIcon = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="#BD9546"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Stupi / Kalasam Pinnacle */}
    <path d="M32 4 L30 10 H34 Z" fill="#BD9546" fillOpacity="0.15" />
    <path d="M26 6 L25 10 H28 Z" fill="#BD9546" fillOpacity="0.15" />
    <path d="M38 6 L36 10 H39 Z" fill="#BD9546" fillOpacity="0.15" />
    {/* Tier 1 */}
    <path d="M22 10 H42 L40 17 H24 Z" />
    <line x1="28" y1="12" x2="28" y2="15" />
    <line x1="32" y1="12" x2="32" y2="15" />
    <line x1="36" y1="12" x2="36" y2="15" />
    {/* Tier 2 */}
    <path d="M20 17 H44 L42 26 H22 Z" />
    <line x1="26" y1="20" x2="26" y2="23" />
    <line x1="32" y1="19" x2="32" y2="24" />
    <line x1="38" y1="20" x2="38" y2="23" />
    {/* Tier 3 */}
    <path d="M18 26 H46 L44 37 H20 Z" />
    <line x1="24" y1="29" x2="24" y2="34" />
    <line x1="32" y1="28" x2="32" y2="35" />
    <line x1="40" y1="29" x2="40" y2="34" />
    {/* Tier 4 - Wide Lower Tier */}
    <path d="M15 37 H49 L47 48 H17 Z" />
    <line x1="22" y1="40" x2="22" y2="45" />
    <line x1="42" y1="40" x2="42" y2="45" />
    {/* Base Temple Gate / Sanctum Entrance */}
    <path d="M13 48 H51 V60 H13 Z" />
    <path d="M26 60 V53 Q32 50 38 53 V60" fill="#BD9546" fillOpacity="0.2" />
    {/* Base plinth */}
    <line x1="9" y1="60" x2="55" y2="60" strokeWidth="2.5" />
  </svg>
);

// 2. Premium Quality Shield Line Icon (Antique Gold #BD9546)
const QualityShieldIcon = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="#BD9546"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Outer Shield with sacred curve */}
    <path
      d="M32 7 L48 13 C48 31 38 49 32 55 C26 49 16 31 16 13 Z"
      fill="#BD9546"
      fillOpacity="0.08"
    />
    {/* Inner Shield border */}
    <path d="M32 12 L44 17 C44 30 36 44 32 49 C28 44 20 30 20 17 Z" strokeWidth="1" />
    {/* Checkmark of verification */}
    <path d="M26 31 L30 36 L39 25" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Radiance dots */}
    <circle cx="32" cy="18" r="1.5" fill="#BD9546" />
  </svg>
);

// 3. Skilled Artisan Sculpting Line Icon (Antique Gold #BD9546)
const ArtisanCraftIcon = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="#BD9546"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Traditional Turban / Head */}
    <circle cx="32" cy="17" r="7" fill="#BD9546" fillOpacity="0.1" />
    <path d="M26 15 C26 11 38 11 38 15 C38 19 26 19 26 15 Z" fill="#BD9546" />
    {/* Torso / Shoulders */}
    <path d="M19 43 C19 32 24 28 32 28 C40 28 45 32 45 43" />
    {/* Hammer in hand */}
    <path d="M16 32 L22 26" strokeWidth="2" />
    <rect x="13" y="24" width="7" height="4" rx="1" transform="rotate(-45 13 24)" fill="#BD9546" />
    {/* Chisel and workpiece */}
    <path d="M42 34 L36 41" strokeWidth="2" />
    <path d="M28 48 H46 L43 55 H25 Z" fill="#BD9546" fillOpacity="0.15" />
    <line x1="22" y1="55" x2="49" y2="55" strokeWidth="2" />
  </svg>
);

// 4. Direct Foundry / Gear Line Icon (Antique Gold #BD9546)
const DirectFoundryIcon = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="#BD9546"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Precision Gear */}
    <circle cx="32" cy="32" r="12" fill="#BD9546" fillOpacity="0.08" />
    <circle cx="32" cy="32" r="6" />
    {/* Gear teeth */}
    <path d="M32 14 V18 M32 46 V50 M14 32 H18 M46 32 H50" strokeWidth="2.5" />
    <path d="M19.27 19.27 L22.1 22.1 M41.9 41.9 L44.73 44.73 M19.27 44.73 L22.1 41.9 M41.9 22.1 L44.73 19.27" strokeWidth="2.5" />
    {/* Direct Arrow loop */}
    <path d="M21 16 A 19 19 0 0 1 48 21" strokeDasharray="2 2" strokeWidth="1.2" />
    <path d="M43 48 A 19 19 0 0 1 16 43" strokeDasharray="2 2" strokeWidth="1.2" />
  </svg>
);

const AboutPage = () => {
  const { isBilingual, language, t } = useLanguage();

  useEffect(() => {
    document.title = isBilingual
      ? 'எங்களைப் பற்றி | About Us — Sri Shakthi Vinayaga Metals'
      : `${t('about.heroBadge')} — Sri Shakthi Vinayaga Metals`;
  }, [isBilingual, language, t]);

  const values = [
    {
      id: 'spiritual-purpose',
      icon: GopuramLineIcon,
      title: t('about.val1Title'),
      subtitle: t('about.val1Sub'),
      desc: t('about.val1Desc'),
      descTa: 'கோயில் பணிக்கான உலோக தயாரிப்புகள்',
      descEn: 'Supporting temple traditions with quality craftsmanship.',
    },
    {
      id: 'quality-materials',
      icon: QualityShieldIcon,
      title: t('about.val2Title'),
      subtitle: t('about.val2Sub'),
      desc: t('about.val2Desc'),
      descTa: 'உயர்தர பித்தளை, செம்பு பயன்படுத்தப்படும்',
      descEn: 'Use of high-grade brass, copper and silver-finish metals.',
    },
    {
      id: 'skilled-craftsmanship',
      icon: ArtisanCraftIcon,
      title: t('about.val3Title'),
      subtitle: t('about.val3Sub'),
      desc: t('about.val3Desc'),
      descTa: 'அனுபவம் வாய்ந்த பாரம்பரிய சிற்பிகள்',
      descEn: 'Crafted by experienced traditional artisans.',
    },
    {
      id: 'direct-manufacturing',
      icon: DirectFoundryIcon,
      title: t('about.val4Title'),
      subtitle: t('about.val4Sub'),
      desc: t('about.val4Desc'),
      descTa: 'இடைத்தரகர் விலையில்லாமல் நேரடியாக வழங்குகிறோம்',
      descEn: 'Direct manufacturing without middleman markups.',
    },
  ];

  return (
    <div className="bg-[#FAF6ED] min-h-screen text-[#51463E] selection:bg-[#BD9546]/30 selection:text-[#591622]">
      <SEOHead
        {...PAGE_SEO.about}
        schema={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About Us', url: '/about' },
          ]),
        ]}
      />
      {/* ========================================================
          1. HERO BANNER (~350–430px height, photographic Prabavalayam)
          ======================================================== */}
      <section
        id="about-hero"
        aria-label="About Sri Shakthi Vinayaga Metals"
        className="relative w-full min-h-[380px] sm:min-h-[420px] lg:h-[430px] flex items-center overflow-hidden bg-[#150a0b]"
      >
        {/* Full-width Realistic Temple Prabavalayam Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about_hero_prabavalayam.jpg"
            alt="Sri Shakthi Vinayaga Metals Prabavalayam and Deity Idol in Stone Temple - Tiruppur Foundry"
            width="1920"
            height="430"
            className="w-full h-full object-cover object-right sm:object-[center_right] filter contrast-[1.03] brightness-[0.97]"
            loading="eager"
            fetchpriority="high"
          />
          {/* Restrained dark gradient overlay on the left for crisp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12070a]/95 via-[#180a0e]/85 sm:via-[#180a0e]/70 md:via-[#180a0e]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12070a]/60 via-transparent to-[#12070a]/30" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-14">
          <div className="max-w-xl lg:max-w-2xl text-left space-y-3 sm:space-y-4">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#E8DCC4]/80 font-serif">
              <Link to="/" className="hover:text-white transition-colors">
                {t('about.breadcrumbHome')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#BD9546]/70 shrink-0" />
              <span className="text-[#BD9546] font-medium">
                {t('about.breadcrumbAbout')}
              </span>
            </nav>

            {/* Small Eyebrow Label */}
            <div className="pt-1">
              <span className="inline-block text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#BD9546]">
                {t('about.heroBadge')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-wide drop-shadow-sm">
              {t('about.heroMainHeading')}
            </h1>

            {/* Subtle Gold Ornamental Divider */}
            <div className="py-1">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-[#BD9546] to-transparent" />
                <span className="text-[#BD9546] text-xs tracking-widest font-serif">✦ • ✦</span>
                <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-[#BD9546] to-transparent" />
              </div>
            </div>

            {/* Descriptions: Tamil & English */}
            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed max-w-xl">
              <p className="text-[#FAF6ED] font-tamil font-normal">
                {t('about.heroMainDesc')}
              </p>
              {isBilingual && (
                <p className="text-[#DECDB8] font-serif italic text-[11px] sm:text-xs">
                  {t('about.heroSecondaryDesc')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SECTION: OUR COMPANY (Two-column: Text Left, Kalasam Right)
          ======================================================== */}
      {/* ========================================================
          2. SECTION: OUR COMPANY (Two-column: Text Left, Kavacham Right)
          with Rich, Visible Temple Mandapam Granite Pillars Background
          ======================================================== */}
      <section
        id="our-company"
        aria-label="Our Company"
        className="relative py-16 sm:py-24 overflow-hidden bg-[#16070B]"
      >
        {/* Rich, Clearly Visible Temple Mandapam Granite Pillars Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/about_mandapam_bg.jpg"
            alt="South Indian Temple Mandapam Carved Granite Pillars"
            className="w-full h-full object-cover object-[center_35%] filter contrast-105 brightness-95"
          />
          {/* Balanced cinematic temple overlay for depth, keeping stone pillars & sunlight vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#16070B]/50 via-transparent to-[#16070B]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Company Text inside Frosted Temple Card (Normal Font Size & Normal Weight) */}
            <div className="lg:col-span-7 bg-[#FAF6ED]/95 sm:bg-[#FAF6ED]/92 backdrop-blur-md p-6 sm:p-10 rounded-3xl border-2 border-[#BD9546] shadow-2xl space-y-4">
              <div>
                <span className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-[#BD9546] block mb-1">
                  {t('about.companyLabel')}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#591622] leading-tight">
                  {t('about.companyHeading')}
                </h2>
                <h3 className="font-serif font-semibold text-xs sm:text-sm tracking-widest uppercase text-[#BD9546] mt-1">
                  {t('about.companySubtitle')}
                </h3>
              </div>

              {/* Ornamental Gold Accent Divider */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-14 h-[1.5px] bg-gradient-to-r from-[#BD9546] to-transparent" />
                <span className="text-[#BD9546] text-xs">✦</span>
              </div>

              {/* Primary Content (Tamil in bilingual / default) - Normal Font Size & Normal Weight */}
              <p className="text-sm sm:text-base text-[#51463E] font-tamil font-normal leading-relaxed text-justify">
                {t('about.companyText')}
              </p>

              {/* Secondary English Content in Bilingual mode - Normal Font Size & Normal Weight */}
              {isBilingual && (
                <p className="text-xs sm:text-sm text-[#665F5A] font-sans font-normal leading-relaxed text-justify pt-1 border-t border-[#BD9546]/20">
                  {t('about.companyTextEn')}
                </p>
              )}
            </div>

            {/* Right Column: Authentic Handcrafted Copper Kavacham Photograph */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden border-2 border-[#BD9546] shadow-2xl group bg-[#160b0e]/95 backdrop-blur-sm p-3.5">
                <div className="relative w-full rounded-2xl overflow-hidden bg-[#160b0e]">
                  <img
                    src="/images/real_kavacham.jpg"
                    alt="Sri Shakthi Vinayaga Metals Handcrafted Pure Copper Temple Deity Kavacham"
                    className="w-full h-[460px] sm:h-[500px] object-contain p-2 sm:p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-[#BD9546]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SECTION: OUR CRAFTSMANSHIP (Reversed: Image Left, Text Right)
          with Rich, Visible Temple Mandapam Granite Pillars Background
          ======================================================== */}
      <section
        id="our-craftsmanship"
        aria-label="Our Craftsmanship"
        className="relative py-16 sm:py-24 overflow-hidden bg-[#16070B] border-t border-[#BD9546]/30"
      >
        {/* Rich, Clearly Visible Temple Mandapam Granite Pillars Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/about_mandapam_bg.jpg"
            alt="South Indian Temple Mandapam Carved Granite Pillars"
            className="w-full h-full object-cover object-[center_65%] filter contrast-105 brightness-95"
          />
          {/* Balanced cinematic temple overlay for depth, keeping stone pillars & sunlight vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#16070B]/50 via-transparent to-[#16070B]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Authentic Handcrafted Temple Prabavalayam Photograph */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden border-2 border-[#BD9546] shadow-2xl group bg-white/95 backdrop-blur-sm p-3.5">
                <div className="relative w-full rounded-2xl overflow-hidden bg-white">
                  <img
                    src="/images/real_prabavalayam.jpg"
                    alt="Sri Shakthi Vinayaga Metals Handcrafted Traditional Temple Prabavalayam Arch"
                    className="w-full h-[460px] sm:h-[500px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-[#BD9546]/30" />
                </div>
              </div>
            </div>

            {/* Right Column: Craftsmanship Content inside Frosted Temple Card (Normal Font Size & Normal Weight) */}
            <div className="lg:col-span-7 order-1 lg:order-2 bg-[#FAF6ED]/95 sm:bg-[#FAF6ED]/92 backdrop-blur-md p-6 sm:p-10 rounded-3xl border-2 border-[#BD9546] shadow-2xl space-y-5">
              <div>
                <span className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-[#BD9546] block mb-1">
                  {t('about.craftsmanshipLabel')}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#591622] leading-tight">
                  {t('about.craftsmanshipHeading')}
                </h2>
                <h3 className="font-serif font-semibold text-xs sm:text-sm tracking-widest uppercase text-[#BD9546] mt-1">
                  {t('about.craftsmanshipSubtitle')}
                </h3>
              </div>

              {/* Ornamental Gold Accent Divider */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-14 h-[1.5px] bg-gradient-to-r from-[#BD9546] to-transparent" />
                <span className="text-[#BD9546] text-xs">✦</span>
              </div>

              {/* Primary Content Paragraph 1 (Heritage & Artisans) - Normal Font Size & Normal Weight */}
              <div className="space-y-1.5">
                <p className="text-sm sm:text-base text-[#51463E] font-tamil font-normal leading-relaxed text-justify">
                  {t('about.craftsmanshipText')}
                </p>
                {isBilingual && (
                  <p className="text-xs sm:text-sm text-[#665F5A] font-sans font-normal leading-relaxed text-justify">
                    {t('about.craftsmanshipTextEn')}
                  </p>
                )}
              </div>

              {/* Primary Content Paragraph 2 (Repoussé & Durability) - Normal Font Size & Normal Weight */}
              <div className="space-y-1.5 pt-2 border-t border-[#BD9546]/20">
                <p className="text-sm sm:text-base text-[#51463E] font-tamil font-normal leading-relaxed text-justify">
                  {t('about.craftsmanshipText2')}
                </p>
                {isBilingual && (
                  <p className="text-xs sm:text-sm text-[#665F5A] font-sans font-normal leading-relaxed text-justify">
                    {t('about.craftsmanshipText2En')}
                  </p>
                )}
              </div>

              {/* 3 Craftsmanship Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Pillar 1: Hand Repoussé & Chasing */}
                <div className="p-3 rounded-xl bg-white/90 border border-[#BD9546]/30 shadow-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#BD9546] shrink-0" />
                    <span className="font-serif font-bold text-xs text-[#591622] tracking-wide block truncate">
                      {t('about.craftsmanshipPillar1Title')}
                    </span>
                  </div>
                  <span className="text-[10px] font-serif font-semibold uppercase tracking-wider text-[#BD9546] block pl-3.5">
                    {t('about.craftsmanshipPillar1Sub')}
                  </span>
                  <p className="text-[11px] text-[#665F5A] leading-relaxed pl-3.5 font-sans font-normal">
                    {t('about.craftsmanshipPillar1Desc')}
                  </p>
                </div>

                {/* Pillar 2: Canonical Iconometry */}
                <div className="p-3 rounded-xl bg-white/90 border border-[#BD9546]/30 shadow-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#BD9546] shrink-0" />
                    <span className="font-serif font-bold text-xs text-[#591622] tracking-wide block truncate">
                      {t('about.craftsmanshipPillar2Title')}
                    </span>
                  </div>
                  <span className="text-[10px] font-serif font-semibold uppercase tracking-wider text-[#BD9546] block pl-3.5">
                    {t('about.craftsmanshipPillar2Sub')}
                  </span>
                  <p className="text-[11px] text-[#665F5A] leading-relaxed pl-3.5 font-sans font-normal">
                    {t('about.craftsmanshipPillar2Desc')}
                  </p>
                </div>

                {/* Pillar 3: Ritual Resilience */}
                <div className="p-3 rounded-xl bg-white/90 border border-[#BD9546]/30 shadow-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#BD9546] shrink-0" />
                    <span className="font-serif font-bold text-xs text-[#591622] tracking-wide block truncate">
                      {t('about.craftsmanshipPillar3Title')}
                    </span>
                  </div>
                  <span className="text-[10px] font-serif font-semibold uppercase tracking-wider text-[#BD9546] block pl-3.5">
                    {t('about.craftsmanshipPillar3Sub')}
                  </span>
                  <p className="text-[11px] text-[#665F5A] leading-relaxed pl-3.5 font-sans font-normal">
                    {t('about.craftsmanshipPillar3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION: OUR VALUES (Clean 4-column horizontal layout)
          ======================================================== */}
      <section
        id="our-values"
        aria-label="Our Values"
        className="py-16 sm:py-24 bg-[#FAF6ED] border-t border-[#BD9546]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Heading with Ornament */}
          <div className="text-center max-w-2xl mx-auto space-y-1 mb-12 sm:mb-16">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#591622] tracking-wide">
              {t('about.valuesHeading')}
            </h2>
            <p className="font-serif font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BD9546]">
              {t('about.valuesSubtitle')}
            </p>
            <div className="pt-2">
              <OrnamentalDivider className="opacity-90" />
            </div>
          </div>

          {/* 4 Evenly Spaced Columns with Clean Spacing & Subtle Separators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.id}
                  className={`flex flex-col items-center text-center px-4 sm:px-6 ${idx < values.length - 1 ? 'lg:border-r lg:border-[#BD9546]/20' : ''
                    }`}
                >
                  {/* Clean Gold Line Icon */}
                  <div className="mb-4 text-[#BD9546] hover:scale-105 transition-transform duration-300">
                    <IconComp className="w-12 h-12" />
                  </div>

                  {/* Tamil / Primary Title */}
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#591622] tracking-wide">
                    {val.title}
                  </h3>

                  {/* English Subtitle */}
                  <span className="font-serif font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#BD9546] mt-0.5 mb-2.5">
                    {val.subtitle}
                  </span>

                  {/* Description text */}
                  {isBilingual ? (
                    <div className="space-y-1 text-xs text-[#51463E] leading-relaxed max-w-xs">
                      <p className="font-tamil">{val.descTa}</p>
                      <p className="text-[11px] text-[#665F5A] font-sans">{val.descEn}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-[#51463E] leading-relaxed max-w-xs">
                      {val.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SECTION: CUSTOM QUOTATION CTA (Deep Maroon Banner with Lamp)
          ======================================================== */}
      <section
        id="custom-quotation-cta"
        aria-label="Get a Custom Quotation"
        className="w-full bg-[#3D0B16] text-white border-y border-[#BD9546]/30 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Glowing Traditional Brass Temple Lamp (Kuthu Vilakku) */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-44 sm:w-48 lg:w-full max-w-[200px] aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden border border-[#BD9546]/40 shadow-lg">
                <img
                  src="/images/about_ganesha.jpg"
                  alt="Traditional brass Kuthu Vilakku temple oil lamp glowing with sacred flame"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D0B16]/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Middle: Content */}
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
              <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#BD9546] block">
                {t('about.ctaEyebrow')}
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
                {t('about.ctaHeading')}
              </h2>
              <h3 className="font-serif font-semibold text-xs sm:text-sm tracking-widest uppercase text-[#BD9546]/90">
                {t('about.ctaHeadingEn')}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF6ED]/90 leading-relaxed font-tamil pt-1">
                {t('about.ctaDesc')}
              </p>
              {isBilingual && (
                <p className="text-xs text-[#DECDB8]/80 font-sans leading-relaxed">
                  {t('about.ctaDescEn')}
                </p>
              )}
            </div>

            {/* Right: Action Buttons */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch sm:items-center lg:items-stretch">
              {/* Primary: Request a Quotation (Gold Filled) */}
              <Link
                to="/request-quote"
                id="about-cta-quote-btn"
                className="px-5 py-3.5 bg-[#BD9546] hover:bg-[#a98236] text-[#260811] font-serif font-bold text-xs sm:text-sm rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 group text-center"
              >
                <FileText className="w-4 h-4 text-[#260811] shrink-0" />
                <div className="text-left">
                  <span className="block font-bold">{t('about.ctaQuoteBtn')}</span>
                  {isBilingual && (
                    <span className="block text-[10px] font-sans font-normal opacity-90 leading-tight">
                      {t('about.ctaQuoteBtnSub')}
                    </span>
                  )}
                </div>
              </Link>

              {/* Secondary: Contact Us (Maroon Outline with Gold Border) */}
              <Link
                to="/contact"
                id="about-cta-contact-btn"
                className="px-5 py-3 border border-[#BD9546]/80 hover:bg-white/10 text-white font-serif font-medium text-xs sm:text-sm rounded-lg flex items-center justify-center text-center transition-colors duration-200"
              >
                <span>
                  {isBilingual ? 'தொடர்புக்கு | Contact' : t('about.ctaContactBtn')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
