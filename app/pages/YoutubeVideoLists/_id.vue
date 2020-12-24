<template>
  <div class="container">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>YoutubeVideoListsData (PC Display Only)</p>
    </div>
    <button
      v-on:click="downloadCSV"
      class="mx-1 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow"
    >
      CSV DownLoad
    </button>
    <!-- table tag is required for copy&paste to create excel data -->
    <table class="w-full overflow-scroll text-xs">
      <tr
        v-for="video in videos"
        :key="video.id"
        class="flex justify-between items-center"
      >
        <td class="video-item">{{ video.snippet.title }}</td>
        <td class="video-item-id longurl">{{ video.snippet.resourceId.videoId }}</td>
        <td v-if="video.snippet.thumbnails.default" class="video-item longurl">
          {{ video.snippet.thumbnails.default.url }}
        </td>
        <td class="video-item longurl">
          {{ video.snippet.description.slice(0, 140) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  async fetch({ route, store }) {
    await store.dispatch("fetchYoutubeVideoLists", route.params.id);
  },
  computed: {
    videos() {
      return this.$store.getters["YoutubeVideoLists"];
    }
  },
  methods: {
    downloadCSV() {
      const videoLists = this.$store.getters["YoutubeVideoLists"];
      console.log(videoLists);

      let csv = "\ufeff" + "Title,VideoId,Thumbnail,Description\n";
      videoLists.forEach(video => {
        const newTitle = video.snippet.title.replace(/\r?\n?,?/g, "");
        const newVideoId = video.snippet.resourceId.videoId.replace(
          /\r?\n?,?/g,
          ""
        );
        const newThumbnail = video.snippet.thumbnails.default.url.replace(
          /\r?\n?,?/g,
          ""
        );
        const newDescription = video.snippet.description.replace(
          /\r?\n?,?/g,
          ""
        );

        const line =
          newTitle +
          "," +
          newVideoId +
          "," +
          newThumbnail +
          "," +
          newDescription +
          "\n";

        csv += line;
      });
      let blob = new Blob([csv], { type: "text/csv" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Result.csv";
      link.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.longurl {
  word-break: break-all;
}

.video-item {
  padding: 4px;
  width: 25%;
}
.video-item-id {
  padding: 4px;
  width: 10%;
}
</style>
