<template>
  <div class="footer">
    <div class="footer__inner max-w-2xl p-2">
      <nuxt-link to="/">
        <div
          class="footer__item flex-column justify-center align-center text-center text-green-700 hover:text-green-300"
        >
          <div>
            <font-awesome-icon :icon="['fas', 'home']" />
          </div>
          <span>TOP</span>
        </div>
      </nuxt-link>
      <div
        class="footer__item flex-column justify-center align-center text-center text-green-700 hover:text-green-300 cursor-pointer"
        @click="backToList"
      >
        <div>
          <font-awesome-icon :icon="['fas', 'angle-double-left']" />
        </div>
        <span>Back</span>
      </div>
      <nuxt-link to="/Settings">
        <div
          class="footer__item flex-column justify-center text-center text-green-700 hover:text-green-300"
        >
          <div>
            <font-awesome-icon :icon="['fas', 'cog']" />
          </div>

          <span>
            Settings
          </span>
        </div>
      </nuxt-link>

      <div
        class="footer__item flex-column justify-center text-center text-green-700 hover:text-green-300 cursor-pointer"
         @click="signOut" 
      >
        <div>
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </div>
        <span>SignOut</span>

      </div>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";
export default {
  async mounted() {
    this.currentPage = $nuxt.$route.path;
    console.log(this.currentPage);
  },
  methods: {
    backToList() {
      if (this.currentPage == "/") {
        return
      } else {
        this.$router.go(-1);
      }
    },
    async signOut(err) {
      await auth().signOut();
      await this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #f2f2f2;
  height: 80px;
  font-size: 12px;
  z-index: 99;
  width: 100%;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }

  &__item {
    height: 55px;
    width: 55px;
    margin: 12px;
  }
}
</style>
