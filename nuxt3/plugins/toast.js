import Toaster from "@meforma/vue-toaster";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toaster)
})
