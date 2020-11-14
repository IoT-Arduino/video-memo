<template>
  <div>
    <youtube ref="youtube" :video-id="videoId" />
    <p>VideoId: {{ $route.params.id }}</p>
    <!-- <img :src="currentVideo.thumbnail" alt="" />
    <p>{{ currentVideo.title }}</p>
    <p>{{ currentVideo.description }}</p>
    <div>{{ currentVideo.id }}</div> -->
    <!-- <p>{{ memoData }}</p> -->
    <p>recordId: {{ recordId }}</p>
    <p>tableId: {{ tableId }}</p>

    <form class="form" @submit.prevent="submit(recordId,tableId)">
      <textarea type="text" v-model="memo" class="text-area" 
      
      />
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
export default {
  mounted: function() {
    const currentId = this.$nuxt.$route.params.id;
    const queryString = this.$nuxt.$route.query.id.split("?");

    // var recordId = queryString[0];
    // const tableId = queryString[1];
    this.recordId = queryString[0];
    this.tableId = queryString[1];

    // this.$store.dispatch("setCurrentVideo", currentId);
    this.loadItem(this.recordId,this.tableId);
    // console.log(tableId);
    console.log(this.recordId);
    console.log(this.tableId);
  },
  data() {
    return {
      videoId: this.$nuxt.$route.params.id,
      memoData: "",
      memo: "",
      recordId:"",
      tableId:""
    };
  },
  computed: {
    // currentVideo() {
    //   return this.$store.getters["currentVideo"];
    // },
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    loadItem: function(recordId,tableId) {
      console.log(recordId);
      console.log(tableId);
      // Init variables
      var self = this;
      var app_id = "applalJUP0IngU6jQ";
      var app_key = "keyd5fbLuMg5nDqdT";

      var table_id = tableId;

      this.items = [];
      this.$axios
        .get(
          "https://api.airtable.com/v0/" +
            app_id +
            "/" +
            table_id +
            "?view=Grid%20view",
          {
            headers: { Authorization: "Bearer " + app_key }
          }
        )
        .then((response) => {
          // self.items = response.data.records;
          self.items = response.data.records.find(record => {
            // console.log(record.fields.Title)
           return record.id == recordId
          });
          self.memoData = self.items.fields.memo
          this.memo = self.items.fields.memo
          console.log(self.memoData);
          // console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit(recordId,tableId) {
      // Init variables
      var self = this;
      // var recordId = this.$nuxt.$route.query.id;
      var app_id = "applalJUP0IngU6jQ";
      var app_key = "keyd5fbLuMg5nDqdT";
      var tableId = tableId;

      console.log(recordId);
      console.log(tableId);

      const data = {
        records: [
          {
            id: recordId,
            fields: {
              // VideoId: this.$nuxt.$route.params.id,
              memo: this.memo
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
    }
  }
};
</script>

<style>
.text-area {
  width: 60%;
  height: 400px;
}
</style>
