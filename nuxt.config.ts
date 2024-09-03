import { posts } from './content/posts.json'
import en from './locales/en.json'
import fr from './locales/fr.json'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxtjs/i18n"],
  ssr: false,
  css: ['highlight.js/styles/github-dark.min.css'],
  experimental: {
    defaults: {
      nuxtLink: {
        activeClass: 'router-link-active text-white',
        exactActiveClass: 'router-link-exact-active text-white',
        prefetchedClass: undefined, // can be any valid string class name
        trailingSlash: undefined // can be 'append' or 'remove'
      }
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap' }
      ]
    }
  },
  watch:[
    "theater/*",
    "assets/*",
    "components/*",
    "layouts/*",
    "pages/*",
    "plugins/*",
    "static/*",
    "utils/*",
  ],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      posts.nodes.forEach(post => {
        nitroConfig.prerender.routes.push("/blog/" + post.slug);
      });
    },
  },
  i18n: {
    vueI18n: './i18n.config.js',
  }
})