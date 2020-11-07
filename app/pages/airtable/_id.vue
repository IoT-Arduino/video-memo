<template>
  <div>
    <p>airtableテストページ</p>
    <ul>
      <li v-for="item in items" :key="item.id">
        <img :src="item['fields']['Thumbnail']" width="150" />
        <h3>{{ item["fields"]["Title"] }}</h3>
        <p>{{ item["fields"]["VideoId"] }}</p>
        <nuxt-link :to="`/airtableVideo/${item.fields.VideoId}?id=${item.id}`">
          {{ item["fields"]["VideoId"] }}
        </nuxt-link>
        <p>{{ item["fields"]["Description"] }}</p>
        <p>{{ item["fields"]["memo"] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created: function() {
    const currentId = this.$nuxt.$route.params.id;
    // this.$store.dispatch("setCurrentVideo", currentId);
  },
  mounted: function() {
    this.loadItems();
  },
  methods: {
    loadItems: function() {
      // Init variables
      var self = this;
      var app_id = "applalJUP0IngU6jQ";
      var app_key = "keyd5fbLuMg5nDqdT";
      // var table_id = "テクノロジー";
      var table_id = this.$nuxt.$route.params.id;
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
