export default defineNuxtConfig({
  app: {
    head: {
      title: "donnees",
    },
  },
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  // @ts-ignore
  ui: {
    icons: ["ph"],
  },
  watch: ["server/**/*.ts"],
  runtimeConfig: {
    dbUser: process.env.NUXT_DB_USER,
    dbPass: process.env.NUXT_DB_PASS,
    dbPort: process.env.NUXT_DB_PORT,
    dbHost: process.env.NUXT_DB_HOST,
    dbName: process.env.NUXT_DB_NAME,
  },
});
