import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';

const LanguageContext = createContext();

export const AVAILABLE_LANGUAGES = [
  {
    code: 'bilingual',
    nativeName: 'தமிழ் & English',
    englishName: 'Bilingual (Default)',
    flag: '🕉️',
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    flag: '🇮🇳',
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    flag: '🌐',
  },
  {
    code: 'ml',
    nativeName: 'മലയാളം',
    englishName: 'Malayalam',
    flag: '🇮🇳',
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    flag: '🇮🇳',
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    flag: '🇮🇳',
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    flag: '🇮🇳',
  },
];

export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ssvm_language');
      if (saved && AVAILABLE_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    }
    return 'bilingual';
  });

  useEffect(() => {
    // Sync i18n instance and document language
    i18n.changeLanguage(language);
    const htmlLang = language === 'bilingual' ? 'ta' : language;
    document.documentElement.lang = htmlLang;
    document.documentElement.setAttribute('data-lang', language);
  }, [language, i18n]);

  const changeLanguage = (code) => {
    if (!AVAILABLE_LANGUAGES.some((l) => l.code === code)) return;
    setLanguageState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ssvm_language', code);
    }
    i18n.changeLanguage(code);
    const htmlLang = code === 'bilingual' ? 'ta' : code;
    document.documentElement.lang = htmlLang;
    document.documentElement.setAttribute('data-lang', code);
  };

  /**
   * Helper to localize category data based on current language mode.
   * Fallback order: 1. Selected language -> 2. English -> 3. Tamil
   */
  const getLocalizedCategory = (cat) => {
    if (!cat) return { primaryName: '', secondaryName: '', description: '' };

    const taName = cat.nameTranslations?.ta || cat.tamilName || cat.name;
    const enName = cat.nameTranslations?.en || cat.name;

    const taDesc = cat.descriptionTranslations?.ta || cat.tamilDescription || cat.description;
    const enDesc = cat.descriptionTranslations?.en || cat.description;

    if (language === 'bilingual') {
      return {
        primaryName: taName,
        secondaryName: enName,
        combinedName: `${taName} — ${enName}`,
        description: taDesc || enDesc,
        secondaryDescription: enDesc,
      };
    }

    if (language === 'ta') {
      return {
        primaryName: taName,
        secondaryName: '',
        combinedName: taName,
        description: taDesc || enDesc,
        secondaryDescription: '',
      };
    }

    if (language === 'en') {
      return {
        primaryName: enName,
        secondaryName: '',
        combinedName: enName,
        description: enDesc || taDesc,
        secondaryDescription: '',
      };
    }

    // ml, te, kn, hi
    const localizedName = cat.nameTranslations?.[language] || enName || taName;
    const localizedDesc = cat.descriptionTranslations?.[language] || enDesc || taDesc;

    return {
      primaryName: localizedName,
      secondaryName: '',
      combinedName: localizedName,
      description: localizedDesc,
      secondaryDescription: '',
    };
  };

  /**
   * Helper to localize product data based on current language mode.
   * Fallback order: 1. Selected language -> 2. English -> 3. Tamil
   */
  const getLocalizedProduct = (prod) => {
    if (!prod) return { primaryName: '', secondaryName: '', shortDesc: '', fullDesc: '' };

    const taName = prod.nameTranslations?.ta || prod.tamilName || prod.name;
    const enName = prod.nameTranslations?.en || prod.name;

    const taShort = prod.shortDescriptionTranslations?.ta || prod.tamilShortDescription || prod.shortDescription;
    const enShort = prod.shortDescriptionTranslations?.en || prod.shortDescription;

    const taFull = prod.fullDescriptionTranslations?.ta || prod.tamilFullDescription || prod.fullDescription;
    const enFull = prod.fullDescriptionTranslations?.en || prod.fullDescription;

    if (language === 'bilingual') {
      return {
        primaryName: taName,
        secondaryName: enName,
        combinedName: `${taName} | ${enName}`,
        shortDesc: taShort || enShort,
        secondaryShortDesc: enShort,
        fullDesc: taFull || enFull,
        secondaryFullDesc: enFull,
      };
    }

    if (language === 'ta') {
      return {
        primaryName: taName,
        secondaryName: '',
        combinedName: taName,
        shortDesc: taShort || enShort,
        secondaryShortDesc: '',
        fullDesc: taFull || enFull,
        secondaryFullDesc: '',
      };
    }

    if (language === 'en') {
      return {
        primaryName: enName,
        secondaryName: '',
        combinedName: enName,
        shortDesc: enShort || taShort,
        secondaryShortDesc: '',
        fullDesc: enFull || taFull,
        secondaryFullDesc: '',
      };
    }

    // ml, te, kn, hi
    const localizedName = prod.nameTranslations?.[language] || enName || taName;
    const localizedShort = prod.shortDescriptionTranslations?.[language] || enShort || taShort;
    const localizedFull = prod.fullDescriptionTranslations?.[language] || enFull || taFull;

    return {
      primaryName: localizedName,
      secondaryName: '',
      combinedName: localizedName,
      shortDesc: localizedShort,
      secondaryShortDesc: '',
      fullDesc: localizedFull,
      secondaryFullDesc: '',
    };
  };

  /**
   * Craft WhatsApp enquiry message in the currently active language.
   */
  const getWhatsAppMessage = (productOrRef, customDetails = '') => {
    const prodName = typeof productOrRef === 'object' && productOrRef
      ? (getLocalizedProduct(productOrRef).primaryName || productOrRef.name)
      : (productOrRef || '');

    const prodCode = typeof productOrRef === 'object' && productOrRef?.productCode
      ? productOrRef.productCode
      : '';

    switch (language) {
      case 'ta':
        return `வணக்கம்! நான் ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ்${prodName ? ` - ${prodName}` : ''}${prodCode ? ` (${prodCode})` : ''} குறித்து விலைப்புள்ளி மற்றும் விபரம் அறிய விரும்புகிறேன்.${customDetails ? ` தேவை: ${customDetails}` : ''}`;
      case 'en':
        return `Hello! I would like to enquire about ${prodName || 'temple metal products'}${prodCode ? ` (Code: ${prodCode})` : ''} from Sri Shakthi Vinayaga Metals, Tirupur.${customDetails ? ` Requirements: ${customDetails}` : ''}`;
      case 'ml':
        return `നമസ്കാരം! ശ്രീ ശക്തി വിനായക മെറ്റൽസ്${prodName ? ` - ${prodName}` : ''}${prodCode ? ` (കോഡ്: ${prodCode})` : ''} സംബന്ധിച്ച് ക്വട്ടേഷനും കൂടുതൽ വിവരങ്ങളും അറിയാൻ ആഗ്രഹിക്കുന്നു.${customDetails ? ` ആവശ്യങ്ങൾ: ${customDetails}` : ''}`;
      case 'te':
        return `నమస్కారం! శ్రీ శక్తి వినాయక మెటల్స్${prodName ? ` - ${prodName}` : ''}${prodCode ? ` (కోడ్: ${prodCode})` : ''} గురించి కొటేషన్ మరియు వివరాలు తెలుసుకోవాలనుకుంటున్నాను.${customDetails ? ` అవసరమైన వివరాలు: ${customDetails}` : ''}`;
      case 'kn':
        return `ನಮಸ್ಕಾರ! ಶ್ರೀ ಶಕ್ತಿ ವಿನಾಯಕ ಮೆಟಲ್ಸ್${prodName ? ` - ${prodName}` : ''}${prodCode ? ` (ಕೋಡ್: ${prodCode})` : ''} ಕುರಿತು ಕೊಟೇಶನ್ ಮತ್ತು ವಿವರಗಳನ್ನು ತಿಳಿಯಲು ಬಯಸುತ್ತೇನೆ.${customDetails ? ` ಅಗತ್ಯವಿರುವ ವಿವರ: ${customDetails}` : ''}`;
      case 'hi':
        return `नमस्ते! मैं श्री शक्ति विनायक मेटल्स से ${prodName || 'मंदिर उत्पादों'}${prodCode ? ` (कोड: ${prodCode})` : ''} के बारे में कोटेशन और विवरण जानना चाहता हूँ।${customDetails ? ` आवश्यकता: ${customDetails}` : ''}`;
      case 'bilingual':
      default:
        return `வணக்கம்! நான் ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ்${prodName ? ` - ${prodName}` : ''}${prodCode ? ` (${prodCode})` : ''} குறித்து விலைப்புள்ளி அறிய விரும்புகிறேன். Hello! I would like to enquire about this temple product from Sri Shakthi Vinayaga Metals.${customDetails ? ` Requirements: ${customDetails}` : ''}`;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isBilingual: language === 'bilingual',
        changeLanguage,
        currentLanguageObj: AVAILABLE_LANGUAGES.find((l) => l.code === language) || AVAILABLE_LANGUAGES[0],
        availableLanguages: AVAILABLE_LANGUAGES,
        getLocalizedCategory,
        getLocalizedProduct,
        getWhatsAppMessage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
