<template>
  <div class="container">
    <div class="youtube-wrapper">
      <div class="youtube-player-wrapper">
        <youtube ref="youtube" :video-id="videoId" />
      </div>
    </div>
    <div class="m-2">
      <p>Category: {{ tableId }}</p>
      <p class="text-left">{{ airTableRecord.Title }}</p>
    </div>
    <form class="form" @submit.prevent="submit(recordId, tableId)">
      <textarea type="text" v-model="memo" class="text-area" />
      <div class="border-solid">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto"
        >
          <font-awesome-icon :icon="['fas', 'save']" />
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  async asyncData({ store, route }) {
    const queryString2 = route.query.id.split("?");
    let recordId = queryString2[0];
    let tableId = queryString2[1];

    const dispatchInfo = {
      tableId: tableId,
      currentPage: "VideoPage",
      recordId: recordId
    };
    console.log(dispatchInfo);
    await store.dispatch("fetchAirTableData", dispatchInfo);
  },
  async mounted() {
    const currentId = this.$nuxt.$route.params.id;
    const queryString = this.$nuxt.$route.query.id.split("?");
    this.recordId = queryString[0];
    this.tableId = queryString[1];

  },
  data() {
    return {
      videoId: this.$nuxt.$route.params.id,
      memoData: "",
      recordId: "",
      tableId: "",
      Title: ""
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    airTableRecord() {
      return this.$store.getters["airTableRecord"];
    },
    memo:{
      get(){
        return this.$store.getters["airTableRecord"].memo
      },
      set(newValue){
        this.submit(this.recordId, this.tableId, newValue) 
      }
    }
  },
  methods: {
    // loadItem: function(recordId, tableId) {
    //   // Init variables
    //   var self = this;
    //   var app_id = process.env.AIRTABLE_APP_ID;
    //   var app_key = process.env.AIRTABLE_API_KEY;
    //   var table_id = tableId;
    //   this.items = [];
    //   this.$axios
    //     .get(
    //       "https://api.airtable.com/v0/" +
    //         app_id +
    //         "/" +
    //         table_id +
    //         "?view=Grid%20view",
    //       {
    //         headers: { Authorization: "Bearer " + app_key }
    //       }
    //     )
    //     .then(response => {
    //       self.items = response.data.records.find(record => {
    //         return record.id == recordId;
    //       });
    //       // self.memoData = self.items.fields.memo;
    //       this.memo = self.items.fields.memo;
    //       this.Title = self.items.fields.Title;
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    submit(recordId, tableId, newValue) {
      // Init variables
      var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var tableId = tableId;

      const data = {
        records: [
          {
            id: recordId,
            fields: {
              memo: newValue
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
          console.log(self.items);
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
