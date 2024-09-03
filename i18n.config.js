import en from '../locales/en.json'
import fr from '../locales/fr.json'

export default defineI18nConfig(() => {
    return {
        legacy: false,
        locales: ['en', 'fr'],
        strategy: 'no_prefix',
        messages: {
            en,
            fr
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            onlyOnRoot: true,
            fallbackLocale: 'en',
            redirectOn: 'root',
        },
    }
})