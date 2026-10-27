import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  // The 6 specific languages requested by user plus the default bilingual mode
  const languagesList = [
    { code: 'bilingual', label: 'தமிழ் & English', subLabel: 'இயல்புநிலை | Default' },
    { code: 'ta', label: 'தமிழ்', subLabel: 'Tamil' },
    { code: 'en', label: 'English', subLabel: 'English' },
    { code: 'ml', label: 'മലയാളം', subLabel: 'Malayalam' },
    { code: 'te', label: 'తెలుగు', subLabel: 'Telugu' },
    { code: 'kn', label: 'ಕನ್ನಡ', subLabel: 'Kannada' },
    { code: 'hi', label: 'हिन्दी', subLabel: 'Hindi' },
  ];

  const currentLang = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        id="language-selector-button"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2D0A14]/70 hover:bg-[#20050D] text-gold-200 hover:text-white border border-gold-500/40 hover:border-gold-400 text-[11px] sm:text-xs font-medium transition-all shadow-xs focus:outline-none focus:ring-1 focus:ring-gold-400"
        title="மொழியைத் தேர்ந்தெடுக்கவும் | Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0 animate-pulse" />
        
        {/* Responsive Label */}
        <span className="hidden md:inline font-medium">
          {language === 'bilingual' ? (
            <>
              <span className="font-tamil">மொழியைத் தேர்ந்தெடுக்கவும்</span>
              <span className="text-gold-500/70 mx-1">|</span>
              <span>Select Language</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-gold-300">{currentLang.label}</span>
              <span className="text-gold-500/70 mx-1">—</span>
              <span className="opacity-90">{currentLang.subLabel}</span>
            </>
          )}
        </span>

        {/* Mobile / Tablet Short Label */}
        <span className="inline md:hidden font-semibold text-gold-300">
          {language === 'bilingual' ? 'தமிழ் | En' : currentLang.label}
        </span>

        <ChevronDown
          className={`w-3 h-3 text-gold-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Elegant Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-selector-button"
          className="absolute right-0 mt-1.5 w-60 sm:w-64 rounded-xl bg-[#2D0A14] border border-gold-500/50 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          {/* Dropdown Header */}
          <div className="px-3.5 py-2 border-b border-gold-600/30 flex items-center justify-between text-[11px] text-gold-300 font-serif font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>மொழியைத் தேர்ந்தெடுக்கவும்</span>
            </span>
            <span className="text-[10px] text-gold-400/80 font-normal">Select Language</span>
          </div>

          <div className="py-1">
            {languagesList.map((langItem) => {
              const isSelected = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(langItem.code)}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold-600/30 to-gold-700/20 text-gold-200 font-bold border-l-2 border-gold-400'
                      : 'text-stone-200 hover:bg-[#3D0E1C] hover:text-white'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm leading-tight text-white font-medium">
                      {langItem.label}
                    </span>
                    <span className="text-[10px] text-gold-300/80 leading-tight">
                      {langItem.subLabel}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-gold-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 border-t border-gold-600/20 bg-black/20 text-[10px] text-gold-300/70 text-center">
            தேர்வு தானாக சேமிக்கப்படும் • Saved automatically
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
