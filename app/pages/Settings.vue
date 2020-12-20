<template>
  <div class="container">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>Settimgs Menu</p>
    </div>
    <nuxt-link :to="'/YoutubePlayLists'">YoutubePlayLists</nuxt-link>
  </div>
</template>

<script>

// temporary 
// export default {
//   mounted() {
//     setTimeout(() => {
//       console.log(this.playlists.length);
//     }, 1000);
//   },
//   async fetch({ store }) {
//     await store.dispatch("fetchYoutubePlayLists");
//   },
//   computed: {
//     playlists() {
//       return this.$store.getters["YoutubePlayLists"];
//     }
//   }
// };
</script>

<style></style>
