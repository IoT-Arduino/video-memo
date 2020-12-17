<template>
  <div class="container mx-auto">
    <div>
      <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
        <p>Youtube PlayLists Top Page</p>
      </div>
      <ul v-for="playlist in playlists" :key="playlist.id">
        <li>
          <nuxt-link :to="`/YoutubeVideoLists/${playlist}`">
            {{ playlist }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    if (store.getters["YoutubePlayLists"].length) {
      return;
    }
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
