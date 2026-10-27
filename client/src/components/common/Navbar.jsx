import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import GaneshaEmblem from './GaneshaLogo';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { settings } = useSettings();
  const { language, isBilingual, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const categoriesList = [
    { key: 'prabavalayam', tamil: 'பிரபாவளையம்', english: 'Prabavalayam', slug: 'prabavalayam' },
    { key: 'kalasam', tamil: 'கலசம்', english: 'Kalasam', slug: 'kalasam' },
    { key: 'templeFlagPole', tamil: 'கோவில் கொடிமரம்', english: 'Temple Flag Pole', slug: 'temple-flag-pole' },
    { key: 'templeBell', tamil: 'கோவில் மணி', english: 'Temple Bell', slug: 'temple-bell' },
    { key: 'kavacham', tamil: 'கவசம்', english: 'Kavacham', slug: 'kavacham' },
    { key: 'deityIdols', tamil: 'சுவாமி சிலைகள்', english: 'Deity Idols', slug: 'deity-idols' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gold-600/20 font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR (Deep Maroon) */}
      <div className="bg-[#4A1424] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-gold-600/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Text */}
          <div className="flex items-center gap-2 font-medium tracking-wide truncate">
            {isBilingual ? (
              <>
                <span className="font-tamil text-gold-300 font-semibold shrink-0">ஆன்மீகம் உங்கள் இல்லத்தில்...</span>
                <span className="text-gold-500/70 hidden sm:inline">|</span>
                <span className="text-white/90 hidden sm:inline">Bring Devotion to Your Home...</span>
              </>
            ) : (
              <span className="text-gold-300 font-semibold truncate">
                {t('common.announcement')}
              </span>
            )}
          </div>

          {/* Right Actions: Request a Quotation, Premium Language Selector & Admin Login */}
          <div className="flex items-center gap-2 sm:gap-4 text-gold-200 shrink-0">
            {/* Request a Quotation Quick Link */}
            <Link
              to="/request-quote"
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors text-gold-300 font-semibold"
              title={isBilingual ? 'விலைப்புள்ளி கோரிக்கை | Request a Quotation' : t('common.requestQuotation')}
            >
              <FileText className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>
                {isBilingual ? (
                  <>
                    <span className="font-tamil">விலைப்புள்ளி கோரிக்கை</span>
                    <span className="text-gold-500/80 mx-1">|</span>
                    <span>Request a Quotation</span>
                  </>
                ) : (
                  <span>{t('common.requestQuotation')}</span>
                )}
              </span>
            </Link>

            <span className="text-gold-600/40 hidden md:inline">|</span>

            {/* Premium Language Selector Dropdown */}
            <LanguageSelector />

            <span className="text-gold-600/40">|</span>

            {/* Admin Login */}
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 hover:text-white transition-colors text-gold-200"
              title={isBilingual ? 'நிர்வாகி நுழைவு | Admin Login' : t('common.login')}
            >
              <User className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>
                {isBilingual ? (
                  <>
                    <span className="font-tamil">நுழைவு</span>
                    <span className="text-gold-500/80 mx-1">|</span>
                    <span>Login</span>
                  </>
                ) : (
                  <span>{t('common.login')}</span>
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Brand Identity & Search) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo + Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <GaneshaEmblem className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              {isBilingual ? (
                <>
                  <span className="font-tamil-serif font-extrabold text-lg sm:text-2xl text-[#8B1E28] tracking-tight leading-tight">
                    ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ்
                  </span>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#262321] tracking-wider leading-tight">
                    Sri Shakthi Vinayaga Metals
                  </span>
                </>
              ) : (
                <span className="font-serif font-extrabold text-lg sm:text-2xl text-[#8B1E28] tracking-tight leading-tight">
                  {t('about.heroTitle')}
                </span>
              )}
              <span className="text-[10px] sm:text-[11px] text-charcoal-muted tracking-wide mt-0.5 font-medium">
                {isBilingual
                  ? 'பிரபாவளையம் • கலசம் • கொடிமரம் • கோவில் மணிகள் | Temple Metalware Manufacturer Tirupur'
                  : `${t('categories.prabavalayam')} • ${t('categories.kalasam')} • ${t('categories.templeFlagPole')} • ${t('categories.templeBell')}`}
              </span>
            </div>
          </Link>

          {/* Right: Search Box */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-sm justify-end">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder={t('common.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF6ED] text-xs px-3.5 py-2.5 rounded-full border border-gold-600/40 focus:outline-none focus:border-gold-600 pl-9 pr-4 transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-[#8B1E28]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MULTILINGUAL NAVIGATION BAR (Desktop Full Width Bar) */}
      <div className="hidden lg:block bg-[#FAF6ED] border-t border-b border-gold-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center space-x-1 py-1">
              {/* 1. Home */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors text-center ${
                    isActive
                      ? 'bg-[#8B1E28] text-gold-200 font-bold shadow-xs'
                      : 'text-[#262321] hover:text-[#8B1E28] hover:bg-gold-100/60'
                  }`
                }
              >
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-bold block leading-tight">முகப்பு</span>
                    <span className="text-[10px] block opacity-85">Home</span>
                  </>
                ) : (
                  <span className="font-serif font-bold block leading-tight px-1">{t('nav.home')}</span>
                )}
              </NavLink>

              {/* 2. Products (Unified with Categories Dropdown) */}
              <div
                className="relative cursor-pointer group"
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              >
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-center ${
                      isActive
                        ? 'bg-[#8B1E28] text-gold-200 font-bold shadow-xs'
                        : 'text-[#262321] group-hover:text-[#8B1E28] group-hover:bg-gold-100/60'
                    }`
                  }
                >
                  <div>
                    {isBilingual ? (
                      <>
                        <span className="font-tamil font-bold block leading-tight">தயாரிப்புகள்</span>
                        <span className="text-[10px] block opacity-85">Products</span>
                      </>
                    ) : (
                      <span className="font-serif font-bold block leading-tight px-1">{t('nav.products')}</span>
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-[#8B1E28] transition-transform duration-200 group-hover:rotate-180" />
                </NavLink>

                {categoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-xl border border-gold-600/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-1.5 border-b border-gold-600/20 text-[11px] font-bold text-gold-800 uppercase tracking-wider">
                      {isBilingual ? 'தயாரிப்பு வகைகள் | Categories' : `${t('nav.products')} (${t('categories.subtitle')})`}
                    </div>
                    {categoriesList.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-charcoal hover:bg-beige-light hover:text-[#8B1E28] transition-colors border-b border-gray-50 last:border-0"
                      >
                        <span className="font-serif font-semibold block text-[#8B1E28]">
                          {isBilingual ? `${cat.tamil} — ${cat.english}` : t(`categories.${cat.key}`)}
                        </span>
                        {isBilingual && (
                          <span className="text-[11px] text-charcoal-muted block">
                            {cat.english}
                          </span>
                        )}
                      </Link>
                    ))}
                    <div className="border-t border-gold-600/20 mt-1 pt-1 bg-beige-light/40">
                      <Link
                        to="/products"
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="block px-4 py-1.5 text-xs font-semibold text-[#8B1E28] hover:underline"
                      >
                        {isBilingual ? 'அனைத்து தயாரிப்புகளும் | View All Products →' : `${t('common.exploreProducts')} →`}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. About Us */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors text-center ${
                    isActive
                      ? 'bg-[#8B1E28] text-gold-200 font-bold shadow-xs'
                      : 'text-[#262321] hover:text-[#8B1E28] hover:bg-gold-100/60'
                  }`
                }
              >
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-bold block leading-tight">எங்களைப் பற்றி</span>
                    <span className="text-[10px] block opacity-85">About Us</span>
                  </>
                ) : (
                  <span className="font-serif font-bold block leading-tight px-1">{t('nav.about')}</span>
                )}
              </NavLink>

              {/* 5. Custom Manufacturing */}
              <NavLink
                to="/custom-manufacturing"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors text-center ${
                    isActive
                      ? 'bg-[#8B1E28] text-gold-200 font-bold shadow-xs'
                      : 'text-[#262321] hover:text-[#8B1E28] hover:bg-gold-100/60'
                  }`
                }
              >
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-bold block leading-tight">தனிப்பயன் தயாரிப்பு</span>
                    <span className="text-[10px] block opacity-85">Custom Manufacturing</span>
                  </>
                ) : (
                  <span className="font-serif font-bold block leading-tight px-1">{t('nav.custom')}</span>
                )}
              </NavLink>

              {/* 6. Contact */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors text-center ${
                    isActive
                      ? 'bg-[#8B1E28] text-gold-200 font-bold shadow-xs'
                      : 'text-[#262321] hover:text-[#8B1E28] hover:bg-gold-100/60'
                  }`
                }
              >
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-bold block leading-tight">தொடர்புக்கு</span>
                    <span className="text-[10px] block opacity-85">Contact</span>
                  </>
                ) : (
                  <span className="font-serif font-bold block leading-tight px-1">{t('nav.contact')}</span>
                )}
              </NavLink>
            </div>

            {/* 7. Request a Quotation */}
            <NavLink
              to="/request-quote"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-4 py-2 rounded-md border font-semibold transition-all shadow-xs ${
                  isActive
                    ? 'bg-[#8B1E28] text-gold-200 border-[#8B1E28]'
                    : 'bg-gold-600 hover:bg-gold-500 text-maroon-950 border-gold-600'
                }`
              }
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <div className="text-left">
                {isBilingual ? (
                  <>
                    <span className="font-tamil text-xs font-bold block leading-tight">விலைப்புள்ளி கோரிக்கை</span>
                    <span className="text-[10px] block leading-tight opacity-90">Request a Quotation</span>
                  </>
                ) : (
                  <span className="font-serif text-xs font-bold block leading-tight">{t('nav.quote')}</span>
                )}
              </div>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gold-600/30 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF6ED] text-xs px-3.5 py-2.5 rounded border border-gold-600/40"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B1E28]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-1 divide-y divide-gray-100 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal hover:text-[#8B1E28]"
            >
              <span className="font-bold block text-sm text-[#8B1E28]">
                {isBilingual ? 'முகப்பு' : t('nav.home')}
              </span>
              {isBilingual && <span className="text-xs text-charcoal-muted">Home</span>}
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal hover:text-[#8B1E28]"
            >
              <span className="font-bold block text-sm text-[#8B1E28]">
                {isBilingual ? 'தயாரிப்புகள்' : t('nav.products')}
              </span>
              {isBilingual && <span className="text-xs text-charcoal-muted">Products</span>}
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal hover:text-[#8B1E28]"
            >
              <span className="font-bold block text-sm text-[#8B1E28]">
                {isBilingual ? 'எங்களைப் பற்றி' : t('nav.about')}
              </span>
              {isBilingual && <span className="text-xs text-charcoal-muted">About Us</span>}
            </Link>

            <Link
              to="/custom-manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal hover:text-[#8B1E28]"
            >
              <span className="font-bold block text-sm text-[#8B1E28]">
                {isBilingual ? 'தனிப்பயன் தயாரிப்பு' : t('nav.custom')}
              </span>
              {isBilingual && <span className="text-xs text-charcoal-muted">Custom Manufacturing</span>}
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal hover:text-[#8B1E28]"
            >
              <span className="font-bold block text-sm text-[#8B1E28]">
                {isBilingual ? 'தொடர்புக்கு' : t('nav.contact')}
              </span>
              {isBilingual && <span className="text-xs text-charcoal-muted">Contact</span>}
            </Link>

            <Link
              to="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-gold-800 font-semibold bg-gold-50/80 px-3 rounded-lg border border-gold-600/30"
            >
              <span className="font-bold block text-sm text-[#8B1E28]">
                {isBilingual ? 'விலைப்புள்ளி கோரிக்கை' : t('nav.quote')}
              </span>
              {isBilingual && <span className="text-xs text-charcoal">Request a Quotation</span>}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
