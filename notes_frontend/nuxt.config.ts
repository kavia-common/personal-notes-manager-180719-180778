export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Personal Notes Manager',
      meta: [
        { name: 'description', content: 'A simple app to create, update, and manage personal notes.' },
      ],
      htmlAttrs: { lang: 'en' },
    },
  },
  css: [
    '~/assets/css/theme.css',
  ],
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
