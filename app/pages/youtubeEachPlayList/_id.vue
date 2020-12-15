<template>
  <div class="container-wrapper">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>PlayListData (PC Display Only)</p>
    </div>
    <!-- table tag is required for copy&paste to create excel data -->
    <table>
      <tr
        v-for="video in videos"
        :key="video.id"
        class="flex justify-between items-center"
      >
        <td class="video-item">{{ video.snippet.title }}</td>
        <td class="video-item-id">{{ video.snippet.resourceId.videoId }}</td>
        <td v-if="video.snippet.thumbnails.default" class="video-item">
          {{ video.snippet.thumbnails.default.url }}
        </td>
        <td class="video-item">
          {{ video.snippet.description.slice(0, 140) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  layout: "defaultPC",
  async asyncData({ route, store, redirect }) {
    await store.dispatch("fetchVideoLists", route.params.id);
  },
  computed: {
    videos() {
      return this.$store.getters["videoLists"];
    }
  }
};
</script>

<style lang="scss" scoped>
.video-item {
  padding: 4px;
  width: 25%;
}
.video-item-id {
  padding: 4px;
  width: 10%;
}
</style>
