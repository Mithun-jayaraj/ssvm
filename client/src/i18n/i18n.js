import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bilingual from './locales/bilingual.json';
import ta from './locales/ta.json';
import en from './locales/en.json';
import ml from './locales/ml.json';
import te from './locales/te.json';
import kn from './locales/kn.json';
import hi from './locales/hi.json';

const resources = {
  bilingual: { translation: bilingual },
  ta: { translation: ta },
  en: { translation: en },
  ml: { translation: ml },
  te: { translation: te },
  kn: { translation: kn },
  hi: { translation: hi },
};

// Retrieve saved language preference or default to bilingual on first visit
const savedLanguage = typeof window !== 'undefined'
  ? localStorage.getItem('ssvm_language') || 'bilingual'
  : 'bilingual';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
