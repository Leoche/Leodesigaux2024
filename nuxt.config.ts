// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", '@nuxtjs/apollo'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://wp.leodesigaux.com/graphql'
      }
    },
  },
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
})