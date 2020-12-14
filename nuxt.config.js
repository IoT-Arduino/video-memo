const {
  AIRTABLE_APP_ID,
  AIRTABLE_API_KEY,
  FIREBASE_API_KEY,
  YOUTUBE_API_KEY
} = process.env;

export default {
  ssr: false, // サーバーサイドレンダリングを無効化
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  srcDir: "app",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "video-memo",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/axios" },
    { src: "~/plugins/vue-youtube" },
    { src: "~/plugins/firebase.js" },
    { src: "~/plugins/firebase.auth.js" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/vuetify"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/tailwindcss"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
    proxy: true
  },

  proxy: {
    "/api/": {
      target: "https://www.googleapis.com/youtube/v3",
      pathRewrite: { "^/api/": "" }
    }
  },

  env: {
    AIRTABLE_APP_ID,
    AIRTABLE_API_KEY,
    FIREBASE_API_KEY,
    YOUTUBE_API_KEY
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  router: {
    middleware: "authenticated"
  }
};
