<template>
  <div class="container">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>Settimgs Menu</p>
    </div>
    <nuxt-link :to="'/YoutubePlayLists'">YoutubePlayLists</nuxt-link>
    <div>
      <nuxt-link
        :to="
          '/YoutubeVideoLists/PLwje-oXlOZnSHgTnPENYI3OPLV--ks25Z'
        "
        >YoutubePlayLists2</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      console.log(this.playlists.length);
    }, 1000);
  },
  async fetch({ store }) {
    await store.dispatch("fetchYoutubePlayLists");
  },
  computed: {
    playlists() {
      return this.$store.getters["YoutubePlayLists"];
    }
  }
};
</script>

<style></style>
