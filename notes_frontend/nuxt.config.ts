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
  // Configure Nuxt dev server binding to ensure consistent preview connectivity
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  // Keep Vite defaults; binding is handled by Nuxt devServer
  vite: {
    server: {
      // Allow external access for containerized environments
      host: true,
      // Do not force port here; Nuxt devServer controls the port
      // allowedHosts not required in recent Vite; leave default permissive
    },
  },
});
