import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import translations from './locales'

// Configuração i18n
const i18nConfig = {
  resources: translations,  // nossas traduções
  fallbackLng: 'pt-BR',     // idioma padrão caso o browser não consiga detectar sozinho
  defaultNS: 'translations' // namespace padrão
}

i18n
  .use(LanguageDetector) // Usa o detector de idioma do browser
  .use(initReactI18next) // Usa o pacote do i18n para React
  .init(i18nConfig) // A config definida anteriormente

export default i18n