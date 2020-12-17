<template>
  <div class="container mx-auto">
    <div>
      <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
        <p>Youtube ChannelLists Top Page</p>
      </div>
      <ul v-for="playlist in playlists" :key="playlist.id">
        <li>
          <nuxt-link :to="`/youtubeEachPlayList/${playlist}`">
            {{ playlist }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ store }) {
    if (store.getters["playLists"].length) {
      return;
    }
    await store.dispatch("fetchPlayLists");
  },
  computed: {
    playlists() {
      return this.$store.state.playLists;
    }
  }
};
</script>

<style></style>
