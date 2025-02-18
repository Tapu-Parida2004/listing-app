import i18n from 'i18next'; // Importing i18next for internationalization
import { initReactI18next } from 'react-i18next'; // Importing the React bindings for i18next
import enTranslation from './locales/en/translation.json'; // Importing English translations
import esTranslation from './locales/es/translation.json'; // Importing Spanish translations

// Initialize i18next with the necessary configuration
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation, // Set English translations
    },
    es: {
      translation: esTranslation, // Set Spanish translations
    },
  },
  lng: 'en', // Default language is set to English
  fallbackLng: 'en', // If the selected language is not available, fallback to English
  interpolation: {
    escapeValue: false, // React already escapes values, so no need for additional escaping
  },
});

export default i18n; // Export the i18n instance for use throughout the app
