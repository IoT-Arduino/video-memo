<template>
  <div class="container">
    <div>
      <p>Youtube ChannelLists Top Page</p>

      <ul v-for="playlist in playlists" :key="playlist.id">
        <li>
          {{ playlist }}
          <nuxt-link :to="`/playList/${playlist}`">
            {{ playlist }}
          </nuxt-link>
        </li>
      </ul>

      <p>Youtube ChannelLists Top Page</p>
      <ul v-for="playlist in playlists" :key="playlist.id">
        <li>
          {{ playlist }}
          <nuxt-link :to="`/airtable/${playlist}`">
            {{ playlist }}
          </nuxt-link>
        </li>
      </ul>

      <div>
        <nuxt-link :to="'/firebase/'">
          firebase
        </nuxt-link>
      </div>
      <div>
        <nuxt-link :to="'/airtable/'">
          airtable
        </nuxt-link>
      </div>
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
    console.log(store.state.playLists);
  },
  computed: {
    playlists() {
      return this.$store.state.playLists;
    }
    // ...mapGetters(['playLists'])
  }
};
</script>

<style></style>
