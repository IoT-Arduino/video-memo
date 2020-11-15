export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  srcDir: "app",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "movie-memo",
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
  plugins: [{ src: "~/plugins/axios" }, { src: "~/plugins/vue-youtube" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/vuetify"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
    proxy: true
  },

  proxy: {
    "/api/": {
      // target: "https://newsapi.org/v2",
      target: "https://www.googleapis.com/youtube/v3",
      pathRewrite: { "^/api/": "" }
    }
  },

  env: {
    NEWS_API_KEY: "9519b5d66b7246929de760c99c0e6f45",
    YOUTUBE_API_KEY: "AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
