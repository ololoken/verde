import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const I18N_LANG_KEY = 'i18n-language';
const fallbackLng = 'ru';
let lng = fallbackLng;
try {
  lng = JSON.parse(localStorage.getItem(I18N_LANG_KEY) ?? JSON.stringify(fallbackLng));
} catch (ignore) {}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng,
    fallbackLng,
    interpolation: {
      escapeValue: false
    },
    nsSeparator: ''
  });
