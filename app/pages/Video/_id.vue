<template>
  <div class="container p-2 sm:p-0">
    <div class="youtube-wrapper">
      <div class="youtube-player-wrapper pt-2">
        <youtube ref="youtube" :video-id="videoId" />
      </div>
    </div>
    <div class="m-2">
      <p>Category: {{ tableId }}</p>
      <p class="text-left">{{ airTableRecord.Title }}</p>
    </div>
    <div @change.stop="change">
      <star-rating
        v-bind:increment="0.5"
        v-bind:max-rating="5"
        inactive-color="#ccc"
        active-color="#f9d71c"
        v-bind:star-size="20"
        :rating="rating"
        @rating-selected="setTest"
        class="m-2"
      >
      </star-rating>
    </div>

    <form class="form" @submit.prevent="submit">
      <textarea
        v-model="memo"
        class="text-area my-2"
        name="memo"
        @keydown.enter.exact="keyDownEnter"
      ></textarea>
      <div class="border-solid  text-white">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded mx-auto"
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
export default {
  components: {
    StarRating
  },
  async fetch({ store, route, app }) {
    const queryString = await route.query.id.split("?");
    let recordId = queryString[0];
    let tableId = queryString[1];
    const dispatchInfo = {
      tableId: tableId,
      currentPage: "VideoPage",
      recordId: recordId
    };
    await store.dispatch("fetchAirTableRecord", dispatchInfo);
  },
  async mounted() {
    const queryString2 = await this.$nuxt.$route.query.id.split("?");
    this.recordId = queryString2[0];
    this.tableId = queryString2[1];

    const dispatchInfo = {
      tableId: this.tableId,
      currentPage: "VideoPage",
      recordId: this.recordId
    };

    setTimeout(() => {
      this.rating = this.$store.getters["airTableRecord"].rating;
    }, 1000);
  },
  data() {
    return {
      videoId: this.$nuxt.$route.params.id,
      memoData: "",
      recordId: "",
      tableId: "",
      Title: "",
      rating: 0,
      airTableRecordData: {}
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    airTableRecord() {
      return this.$store.getters["airTableRecord"];
    },
    memo: {
      get() {
        return this.$store.getters["airTableRecord"].memo;
      },
      set(newValue) {
        this.memoData = newValue;
      }
    }
  },
  methods: {
    keyDownEnter(e) {
      // e.preventDefault();
      e.stopPropagation()
    },
    setTest(rating) {
      // this.rating = rating; 
      console.log(this.memoData)
      console.log(rating);

      this.memo = this.memoData

      const airTableRecord = {
        Title:this.airTableRecord.Title,
        rating:rating,
        memo:this.memoData
      }

      console.log(airTableRecord)

      this.$store.commit["setAirTableRecord",airTableRecord]


      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var tableId = this.tableId;

      let data = {
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
          // console.log(response.data.records[0].fields.rating);
          const newRating = response.data.records[0].fields.rating;
          // console.log(this.rating);
          // this.rating = parseFloat(newRating);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    setRatingData(rating) {
      this.rating = rating;
      // console.log(this.rating);

      // var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var tableId = this.tableId;

      // console.log(this.recordId);
      // console.log(this.tableId);

      let data = {
        records: [
          {
            id: this.recordId,
            fields: {
              rating: this.rating
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
          // console.log(response.data.records[0].fields.rating);
          const newRating = response.data.records[0].fields.rating;
          // console.log(this.rating);
          // this.rating = parseFloat(newRating);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      // Init variables
      // var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var tableId = this.tableId;

      console.log(this.memoData);

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
      this.items = [];
      this.$axios
        .patch("https://api.airtable.com/v0/" + app_id + "/" + tableId, data, {
          headers: {
            Authorization: "Bearer " + app_key,
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          self.items = response.data.records;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$toast.show("Item Saved");
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
  height: 400px;
  border: 1px solid gray;
}
</style>
