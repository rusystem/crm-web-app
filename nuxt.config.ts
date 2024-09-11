// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/device'
  ],
  colorMode: {
    classSuffix: '',
  },
  device: {
    refreshOnResize: true,
  },
  // css: ['@/assets/styles/element-variables.scss'],
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: `@use "@/assets/styles/element-variables.scss" as *;`, // Переопределение Element Plus переменных
  //       },
  //     },
  //   },
  // },
  build: {
    transpile: ['element-plus'], // Добавляем транспиляцию Element Plus
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/element-variables.scss" as *;`, // Убедись, что переменные подключены перед стилями
        },
      },
    },
  },
})