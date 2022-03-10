import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    
    server: {
      host: process.env.HOST,
      port : process.env.PORT
    },

    css : [
        "bootstrap/dist/css/bootstrap.css"
    ],

    plugins: [
        {src : "@/plugins/vee-validate.js",ssr : false},
        {src : "@/plugins/toast.js",ssr : false},
        {src : "@/plugins/axios.js",ssr : false},
    ],

    head: {
        title: 'Nuxt3',
        htmlAttrs: {
          lang: 'en'
        },
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' }
        ],
    },

    publicRuntimeConfig: {
      apiUrl : process.env.API_URL,
    },
});
