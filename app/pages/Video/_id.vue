<template>
  <div class="container">
    <youtube ref="youtube" :video-id="videoId" />
    <p>TableId: {{ tableId }}</p>
    <p>Title: {{ Title }}</p>

    <form class="form" @submit.prevent="submit(recordId, tableId)">
      <textarea type="text" v-model="memo" class="text-area" />
      <div class="border-solid">
        <button type="submit">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  mounted: function() {
    const currentId = this.$nuxt.$route.params.id;
    const queryString = this.$nuxt.$route.query.id.split("?");
    this.recordId = queryString[0];
    this.tableId = queryString[1];
    this.loadItem(this.recordId, this.tableId);
  },
  data() {
    return {
      videoId: this.$nuxt.$route.params.id,
      memoData: "",
      memo: "",
      recordId: "",
      tableId: "",
      Title:""
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    loadItem: function(recordId, tableId) {
      // Init variables
      var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
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
        .then(response => {
          // self.items = response.data.records;
          self.items = response.data.records.find(record => {
            return record.id == recordId;
          });
          self.memoData = self.items.fields.memo;
          this.memo = self.items.fields.memo;
          this.Title = self.items.fields.Title
          console.log(self.items.fields.Title);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit(recordId, tableId) {
      // Init variables
      var self = this;
      // var recordId = this.$nuxt.$route.query.id;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var tableId = tableId;

      const data = {
        records: [
          {
            id: recordId,
            fields: {
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
  width: 640px;
  height: 400px;
  border: 1px solid gray;
}
</style>
