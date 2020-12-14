<template>
  <header class="p-3 mb-2 bg-green-400 text-white">
    <div class="flex justify-between items-center">
      <a href="/" class="hover:text-green-800"
        ><h1 class="text-xl font-semibold">ゴルフ理論解体新書</h1></a
      >
      <div
        v-if="!isLoginPage"
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
  props: ["isLoginPage"],
  async mounted(){
    await console.log(this.isLoginPage)
  },
  methods: {
    signOut: function(err) {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.replace("/login");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped></style>
