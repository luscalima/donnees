export default defineNuxtConfig({
  app: {
    head: {
      title: "donnees",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ui: {
    icons: ["ph"],
  },
});
