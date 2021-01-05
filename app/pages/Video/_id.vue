<template>
  <div class="container p-2 sm:p-0">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
      :backgroundColor="'#fff'"
      :opacity="1"
      :color="'#38feb8'"
    ></loading>
    <p class="mb-2">PlayList: {{ tableId }}</p>
    <div class="youtube-wrapper">
      <div class="youtube-player-wrapper pt-2">
        <youtube ref="youtube" :video-id="videoId" />
      </div>
    </div>
    <div class="m-2">
      <a
        :href="airTableRecord.videoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-left font-bold"
        >{{ airTableRecord.title }}</a
      >
      <div class="sm:flex justify-start">
        <p v-if="airTableRecord.channel" class="mr-6">
          Channel: {{ airTableRecord.channel }}
        </p>
        <p v-if="airTableRecord.publishedAt">
          PublishedAt: {{ airTableRecord.publishedAt }}
        </p>
      </div>
    </div>
    <div @change.stop="change">
      <star-rating
        v-bind:increment="0.5"
        v-bind:max-rating="5"
        inactive-color="#ccc"
        active-color="#f9d71c"
        v-bind:star-size="20"
        :rating="rating"
        @rating-selected="setRating"
        class="m-2"
      >
      </star-rating>
    </div>

    <form class="form" @submit.prevent="submitMemo">
      <textarea
        v-model="memoData"
        class="text-area my-2"
        name="memo"
        @input="input"
      ></textarea>
      <div class="border-solid  text-white">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded mx-auto opacity-50"
          :class="{ active: isMemoEdited }"
          :disabled="isMemoEdited === false"
        >
          <font-awesome-icon :icon="['fas', 'save']" />
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    StarRating,
    loading: Loading
  },
  // async fetch({ store, route }) {
  //   const queryString = await route.query.id.split("?");
  //   this.recordId = await queryString[0];
  //   this.tableId = await queryString[1];
  //   const dispatchInfo = {
  //     tableId: this.tableId,
  //     currentPage: "VideoPage",
  //     recordId: this.recordId
  //   };
  //   await store.dispatch("fetchAirTableRecord", dispatchInfo);
  // },
  async mounted() {
    this.isLoading = true;

    const queryString = await this.$nuxt.$route.query.id.split("?");
    this.recordId = await queryString[0];
    this.tableId = await queryString[1];

    const dispatchInfo = {
      tableId: this.tableId,
      currentPage: "VideoPage",
      recordId: this.recordId
    };

    await this.$store.dispatch("fetchAirTableRecord", dispatchInfo);

    this.$store.watch(
      () => this.$store.getters["airTableRecord"],
      record => {
        const airtableRecord = this.$store.getters["airTableRecord"];
        this.rating = this.$store.getters["airTableRecord"].rating;
        this.memoData = this.$store.getters["airTableRecord"].memo;
        this.isLoading = false;
      }
    );

  },
  data() {
    return {
      isMemoEdited: false,
      isLoading: false,
      fullPage: false,
      videoId: this.$nuxt.$route.params.id,
      tableId: "",
      recordId: "",
      memoData: "",
      rating: 0
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    airTableRecord() {
      return this.$store.getters["airTableRecord"];
    }
  },
  methods: {
    input(e) {
      e.stopPropagation();
      this.isMemoEdited = true;
    },
    setRating(rating) {
      const app_id = process.env.AIRTABLE_APP_ID;
      const app_key = process.env.AIRTABLE_API_KEY;
      const tableId = this.tableId;

      const data = {
        records: [
          {
            id: this.recordId,
            fields: {
              rating: rating
            }
          }
        ]
      };

      this.$axios
        .patch("https://api.airtable.com/v0/" + app_id + "/" + tableId, data, {
          headers: {
            Authorization: "Bearer " + app_key,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const newRating = response.data.records[0].fields.rating;
          const airTableRecord = {
            title: this.airTableRecord.title,
            rating: newRating,
            memo: this.memoData
          };

          this.$store.commit[("setAirTableRecord", airTableRecord)];
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitMemo() {
      const app_id = process.env.AIRTABLE_APP_ID;
      const app_key = process.env.AIRTABLE_API_KEY;
      const tableId = this.tableId;

      const data = {
        records: [
          {
            id: this.recordId,
            fields: {
              memo: this.memoData
            }
          }
        ]
      };

      this.$axios
        .patch("https://api.airtable.com/v0/" + app_id + "/" + tableId, data, {
          headers: {
            Authorization: "Bearer " + app_key,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const items = response.data.records;
          this.$toast.show("Item Saved");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.youtube-wrapper {
  position: relative;
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
}

.youtube-player-wrapper ::v-deep iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.text-area {
  width: 100%;
  height: 300px;
  border: 1px solid gray;
}

.active {
  opacity: 1;
}

@media screen and (max-width: 480px) {
  .text-area {
    height: 240px;
  }
}
</style>
