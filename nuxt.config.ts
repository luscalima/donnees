export default defineNuxtConfig({
  app: {
    head: {
      title: 'donnees',
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
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
    '@nuxtjs/supabase',
    '@nuxt/fonts',
  ],

  shadcn: {
    prefix: 'App',
    componentDir: './components/ui',
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      cookieRedirect: true,
      exclude: ['/'],
    },
  },

  fonts: {
    local: {},
  },

  watch: ['server/**/*.ts'],

  runtimeConfig: {
    dbUser: process.env.NUXT_DB_USER,
    dbPass: process.env.NUXT_DB_PASS,
    dbPort: process.env.NUXT_DB_PORT,
    dbHost: process.env.NUXT_DB_HOST,
    dbName: process.env.NUXT_DB_NAME,
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
})
