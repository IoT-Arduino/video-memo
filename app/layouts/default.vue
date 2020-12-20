<template>
  <div class="wrapper">
    <div class="mx-auto pb-20">
      <Header :currentUser="currentUser" v-if="isLogin" />
      <main class="max-w-2xl mx-auto">
        <Nuxt />
      </main>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";
export default {
  data() {
    return {
      isLogin: false,
      currentUser: ""
    };
  },
  async mounted() {
    await auth().onAuthStateChanged(user => {
      this.isLogin = user ? true : false;
      if (user) {
        this.currentUser = user.email;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
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

main {
  margin: 0 auto;
}

.footer {
  position: fixed;
  bottom: 0;
}
</style>
