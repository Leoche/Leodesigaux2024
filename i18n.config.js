import en from '../locales/en.json'
import fr from '../locales/fr.json'

export default defineI18nConfig(() => {
    return {
        locale: 'fr',
        locales: ['fr', 'en'],
        strategy: 'no_prefix',
        messages: {
            en,
            fr
        },
    }
})