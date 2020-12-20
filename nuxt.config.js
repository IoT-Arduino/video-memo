const {
  AIRTABLE_APP_ID,
  AIRTABLE_API_KEY,
  FIREBASE_API_KEY,
  YOUTUBE_API_KEY
} = process.env;

// Will be replaced by your site
const SITE_DOMAIN = "https://video-memo.netlify.app/";

export default {
  ssr: false,
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
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        href: SITE_DOMAIN + "apple-touch-icon.png"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/axios" },
    { src: "~/plugins/vue-youtube" },
    { src: "~/plugins/firebase" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/fontawesome"],

  fontawesome: {
    icons: {
      solid: [
        "faHome",
        "faAngleDoubleLeft",
        "faAngleDoubleRight",
        "faCog",
        "faSignOutAlt",
        "faList",
        "faSave"
      ]
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/toast"
  ],

  toast: {
    position: "bottom-right",
    duration: 2000
  },

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
    middleware: ["auth"]
  },
  generate: {
    fallback: true
  }
};
