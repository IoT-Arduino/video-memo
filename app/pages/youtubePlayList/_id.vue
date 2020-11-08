<template>
  <div class="container">
    <div>
      <table>
        <tr v-for="video in videos" :key="video.id">
          <td>{{ video.snippet.title }}</td>
          <td>{{ video.snippet.resourceId.videoId }}</td>
          <td v-if="video.snippet.thumbnails.default">
            {{ video.snippet.thumbnails.default.url }}
          </td>
          <!-- <td v-else >Error</td> -->
          <td>{{ video.snippet.description.slice(0, 140) }}</td>
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
    // const array = this.$store.getters["videoLists1"].forEach((item, index) => {
    //   if (item.snippet.thumbnails.default) {
    //     console.log("a");
    //     console.log(index);
    //     console.log(item.snippet.thumbnails.default.url);
    //   } else {
    //     console.log("b");
    //     console.log(index);
    //     console.log(item.snippet);
    //   }
    // });
    console.log(this.$store.getters["videoLists1"].length);
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
