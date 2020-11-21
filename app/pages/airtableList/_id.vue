<template>
  <v-app>
    <v-container>
      <p>再生リスト動画一覧ページ</p>
      <ul>
        <div v-for="item in items" :key="item.id">
          <v-row>
            <v-col cols="4">
              <img :src="item['fields']['Thumbnail']" width="150" />
            </v-col>
            <v-col cols="8">
              <h3>{{ item["fields"]["Title"] }}</h3>
              <nuxt-link
                :to="
                  `/airtableVideo/${item.fields.VideoId}?id=${item.id}?${tableId}`
                "
              >
               動画詳細ページへ
              </nuxt-link>
              <!-- <p>{{ item["fields"]["Description"] }}</p> -->
            </v-col>
          </v-row>

          <p>{{ item["fields"]["memo"] }}</p>
        </div>
      </ul>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      tableId: ""
    };
  },
  created: function() {
    const currentId = this.$nuxt.$route.params.id;
  },
  mounted: function() {
    this.tableId = this.$nuxt.$route.query.name;
    console.log(this.tableId);
    this.loadItems();
  },
  methods: {
    loadItems: function() {
      // Init variables
      var self = this;
      var app_id = "applalJUP0IngU6jQ";
      var app_key = "keyd5fbLuMg5nDqdT";
      var table_id = this.$nuxt.$route.query.name;
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
