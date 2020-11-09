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
  computed: {
    videos() {
      return this.$store.getters["videoLists"];
    }
  }
};
</script>

<style></style>
