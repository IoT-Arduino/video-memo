<template>
  <div class="container">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>PlayList : {{ tableId }}</p>
    </div>
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        class="mb-3 border list-none rounded-sm"
      >
        <div class="flex hover:bg-green-200">
          <div class="flex-none">
            <img :src="item['fields']['Thumbnail']" />
          </div>
          <div class="ml-2 pt-1">
            <nuxt-link
              class="mt-2"
              :to="`/Video/${item.fields.VideoId}?id=${item.id}?${tableId}`"
            >
              <h3 class="mb-2">{{ item["fields"]["Title"] | itemTitle }}</h3>
              <span class="text-indigo-600">Go To Movie Page</span>
              <font-awesome-icon
                :icon="['fas', 'angle-double-right']"
                class="text-indigo-600"
              />
            </nuxt-link>
          </div>
        </div>
        <p v-if="item.fields.memo" class="m-1 p-1 bg-gray-300">
          {{ item["fields"]["memo"] | itemMemo }}
        </p>
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
  filters: {
    itemTitle: function(val) {
      if (val) {
        return `${val.substring(0, 50)}...`;
      } else {
        return;
      }
    },
    itemMemo: function(val) {
      if (val) {
        return `${val.substring(0, 70)}...`;
      } else {
        return;
      }
    }
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
          let beforeSortedItems = [];

          self.items = response.data.records;

          const filteredItems = self.items.filter((item, index) => {
            if (item.fields.Title == "Deleted video") {
              console.log(`Video:${index} has deleted`);
            }
            return item.fields.Title != "Deleted video";
          });

          filteredItems.forEach(data => {
            if (!data.fields.memo) {
              data.fields.memo = "";
            }
            beforeSortedItems.push(data);
          });

          const sortedItems = beforeSortedItems.sort(function(a, b) {
            if (a.fields.memo < b.fields.memo) return -1;
            if (a.fields.memo > b.fields.memo) return 1;
            return 0;
          });

          self.items = sortedItems;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
