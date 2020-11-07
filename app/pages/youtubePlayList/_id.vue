<template>
  <div class="container">
    <div>
      <p>Videos in Playlist</p>
      <table>
        <tr v-for="video in videos" :key="video.id">
          <td>{{video.snippet.title}}</td>
          <td>{{video.snippet.resourceId.videoId}}</td>
          <td>{{video.snippet.thumbnails.default.url}}</td>
          <td>{{video.snippet.description.slice(0,140)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({ route, store, redirect }) {
    await store.dispatch("fetchVideoLists", route.params.id);

  },
  created() {
    // this.$store.dispatch("saveVideoLists",this.$store.state.videoLists1)
  },
  mounted() {
    // this.$store.dispatch("setVideoLists");
    console.log(this.$store.getters["videoLists1"]);
  },
  computed: {
    videos() {
      return this.$store.getters["videoLists1"];
      // return this.$store.state.videoLists1.filter(video => {
      //   return video.playlistId === this.$nuxt.$route.params.id;
      // });
    }
  }
};
</script>

<style></style>
