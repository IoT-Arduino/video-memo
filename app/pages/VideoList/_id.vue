<template>
  <div class="container">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6 hover:bg-green-200">
      <p>再生リスト動画一覧ページ</p>
    </div>
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        class="mb-3 border list-none rounded-sm hover:bg-green-200"
      >
        <div class="flex">
          <div class="flex-none">
            <img :src="item['fields']['Thumbnail']" />
          </div>
          <div class="ml-3">
            <h3>{{ item["fields"]["Title"] }}</h3>
            <nuxt-link
              :to="`/Video/${item.fields.VideoId}?id=${item.id}?${tableId}`"
            >
              動画詳細ページへ
            </nuxt-link>
          </div>
        </div>
        <p class="m-1">{{ item["fields"]["memo"] }}</p>
      </li>
    </ul>
  </div>
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
    this.loadItems();
  },
  methods: {
    loadItems: function() {
      // Init variables
      var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
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
