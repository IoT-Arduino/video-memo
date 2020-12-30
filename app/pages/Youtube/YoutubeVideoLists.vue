<template>
  <div class="container overflow-hidden">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>Get YoutubeVideoListsData (csv file)</p>
    </div>
    <form
      @submit.prevent="fetchYoutubeVideoLists"
      class="mx-4 mb-6 sm:flex justify-between items-center "
    >
      <input
        type="text"
        v-model="playListId"
        class="m-2 p-2 border-2 flex-grow border-solid border-light-blue-500 rounded w-2/3 h-8"
        placeholder="Input Youtube PlayListId"
      />
      <div class="flex items-center flex-shrink">
        <button
          type="submit"
          class="mx-2 my-2 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow h-8 w-20"
        >
          Submit
        </button>
        <input
          type="input"
          value="Clear"
          class="mx-2 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow h-8 w-20"
          @click="clearInput"
        />
      </div>
    </form>

    <div v-if="videos.length > 0" class="py-2 border-t-2">
      <p class="my-4 mx-1">Youtube PlayListId : {{ playListId }}</p>
      <button
        v-on:click="downloadCSV"
        class="mx-1 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow"
      >
        CSV DownLoad
      </button>
    </div>
    <table class="w-full overflow-scroll text-xs">
      <tr
        v-for="video in videos"
        :key="video.id"
        class="flex justify-between items-center"
      >
        <td class="video-item">{{ video.snippet.title }}</td>
        <td class="video-item longurl">{{ video.snippet.publishedAt }}</td>
        <td class="video-item-id longurl">
          {{ video.snippet.resourceId.videoId }}
        </td>
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
  data() {
    return {
      playListId: ""
    };
  },
  computed: {
    videos() {
      return this.$store.getters["YoutubeVideoLists"];
    }
  },
  methods: {
    downloadCSV() {
      const videoLists = this.$store.getters["YoutubeVideoLists"];

      let csv = "\ufeff" + "Title,PublishedAt,VideoId,Thumbnail,Description\n";
      videoLists.forEach(video => {
        const newTitle = video.snippet.title.replace(/\r?\n?,?/g, "");
        const newPublishedAt = video.snippet.publishedAt.replace(
          /\r?\n?,?/g,
          ""
        );
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
          newPublishedAt +
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
    },
    async fetchYoutubeVideoLists() {
      if (this.playListId == "") {
        alert("Please Input Youtube PlayListId");
        return;
      } else {
        await this.$store.dispatch("fetchYoutubeVideoLists", this.playListId);
      }
    },
    clearInput() {
      this.playListId = "";
      this.$store.commit("setYoutubeVideoLists", []);
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
