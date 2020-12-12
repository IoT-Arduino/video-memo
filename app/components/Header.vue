<template>
  <header class="p-3 mb-2 bg-green-400 text-white">
    <div class="flex justify-between items-center">
      <a href="/" class="hover:text-green-800"
        ><h1 class="text-xl font-semibold">ゴルフ理論解体新書</h1></a
      >
      <div
        v-if="this.currentPage !='/login'"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        @click="signOut"
      >
        ログアウト
      </div>
    </div>
  </header>
</template>

<script>
export default {
  mounted() {
      this.currentPage = $nuxt.$route.path
  },
  data(){
      return {
          currentPage:''
      }
  },
  methods: {
    signOut: function(err) {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped></style>
