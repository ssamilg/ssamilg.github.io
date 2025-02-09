import { createI18n } from 'vue-i18n'
import en from './en'
import tr from './tr'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    tr
  }
})

export default i18n