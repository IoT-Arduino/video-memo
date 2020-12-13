<template>
  <div class="max-w-2xl mx-auto">
    <Header :isLoginPage="isLoginPage" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  async mounted() {
    this.currentPage = await $nuxt.$route.path;

    const detectPage = () => {
      if (this.currentPage.match(/login/)) {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    };
  },
  data() {
    return {
      isLoginPage: false,
      currentPage: ""
    };
  },
  methods: {}
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
