import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Search,
  FileText,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useQuotation } from '../../context/QuotationContext';

const Navbar = () => {
  const { settings, getWhatsAppLink } = useSettings();
  const { totalItemsCount, setIsDrawerOpen } = useQuotation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Custom Metalwork', path: '/custom-manufacturing' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 1. Announcement Bar */}
      <div className="bg-[#260811] text-[#FAF6ED] text-xs py-2 px-4 border-b border-gold-600/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
            <p className="font-medium tracking-wide">
              {settings.announcementText ||
                'Traditional Temple Metalware Manufacturer in Tirupur — Prabavalayam & Kalasam Specialists'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-gold-300">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-gold-600/50">|</span>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-green-300 transition-colors text-emerald-400 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-[#4A1424] text-[#FAF6ED] border-b-2 border-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border-2 border-gold-500 bg-[#380E1B] flex items-center justify-center p-1.5 shadow-gold-glow group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <circle cx="32" cy="32" r="30" fill="#4A1424" stroke="#C5A15B" strokeWidth="2"/>
                  <path d="M18 48 C18 22, 46 22, 46 48" stroke="#C5A15B" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="32" cy="14" r="3" fill="#C5A15B"/>
                  <path d="M32 20 L35 27 L29 27 Z" fill="#C5A15B"/>
                  <ellipse cx="32" cy="33" rx="8" ry="6" fill="#C5A15B"/>
                  <path d="M26 39 H38 L36 43 H28 Z" fill="#C5A15B"/>
                  <rect x="22" y="45" width="20" height="3" rx="1.5" fill="#FAF6ED"/>
                </svg>
              </div>
              <div>
                <span className="block font-serif font-bold text-lg sm:text-xl md:text-2xl tracking-wider text-gold-400 group-hover:text-gold-300 transition-colors">
                  SRI SHAKTHI VINAYAGA METALS
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-[#EDE4D5]/80 font-medium">
                  Temple Products & Metalware • Tirupur, Tamil Nadu
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors py-1 relative ${
                      isActive
                        ? 'text-gold-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-500'
                        : 'text-[#EDE4D5] hover:text-gold-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Action Area: Search, Tray, Quote CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gold-300 hover:text-white hover:bg-maroon-700 rounded-full transition-colors"
                title="Search Products by Name or Code"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Quotation Tray Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-gold-300 hover:text-white hover:bg-maroon-700 rounded-full transition-colors"
                title="View Selected Quotation Items"
              >
                <FileText className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-600 text-[#262321] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-maroon-800 shadow">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Prominent Request a Quote Button */}
              <Link
                to="/request-quote"
                className="px-5 py-2.5 rounded bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-sm tracking-wide shadow-md hover:shadow-gold-glow transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-maroon-950" />
                <span>Request a Quote</span>
              </Link>
            </div>

            {/* Mobile Menu & Tray Triggers */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-gold-300"
                aria-label="Quotation Tray"
              >
                <FileText className="w-6 h-6" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-maroon-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gold-300 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown Overlay */}
        {searchOpen && (
          <div className="bg-[#380E1B] border-t border-gold-600/40 px-4 py-3">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Search products by name, code (e.g., SSVM-PB-001), or material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-maroon-950 text-[#FAF6ED] placeholder-gold-300/60 px-4 py-2 rounded border border-gold-600/50 focus:outline-none focus:border-gold-400 text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gold-600 text-maroon-950 font-semibold text-sm rounded hover:bg-gold-500 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="px-3 py-2 text-gold-300 hover:text-white text-sm"
              >
                Close
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#380E1B] border-t border-gold-600/50 px-4 pt-3 pb-6 space-y-3">
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 pb-2">
              <input
                type="text"
                placeholder="Search products or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-maroon-950 text-white placeholder-gold-300/50 px-3 py-2 rounded text-sm border border-gold-600/40"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gold-600 text-maroon-950 font-bold text-xs rounded"
              >
                Go
              </button>
            </form>

            <div className="space-y-1 border-t border-gold-600/30 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-maroon-800 text-gold-400 font-semibold'
                        : 'text-[#EDE4D5] hover:bg-maroon-800 hover:text-gold-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-gold-600/30 flex flex-col gap-2">
              <Link
                to="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-maroon-950 font-serif font-bold text-sm rounded shadow"
              >
                Request a Quotation
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm rounded flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
