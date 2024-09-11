export default defineNuxtConfig({
  app: {
    head: {
      title: 'donnees',
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'es2022',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
    serverAssets: [
      {
        baseName: 'certs',
        dir: './database/certs',
      },
    ],
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/content',
    '@nuxt/eslint',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
  ],

  shadcn: {
    prefix: 'App',
    componentDir: './components/ui',
  },

  watch: ['server/**/*.ts'],

  runtimeConfig: {
    dbUser: process.env.NUXT_DB_USER,
    dbPass: process.env.NUXT_DB_PASS,
    dbPort: process.env.NUXT_DB_PORT,
    dbHost: process.env.NUXT_DB_HOST,
    dbName: process.env.NUXT_DB_NAME,
  },
})
