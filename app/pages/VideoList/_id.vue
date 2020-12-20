<template>
  <div class="container">
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>PlayList : {{ tableId }}</p>
    </div>

    <div class="filter-sort mx-2 my-5 sm:flex justify-between align-center">
      <div class="border-2 w-3/5 sm:w-2/5">
        <!-- <label for="filter">Filter by Title</label> -->
        <input
          placeholder="Filter by Title"
          type="text"
          v-model="filterName"
          name="filter"
          class="border-2 w-full p-0"
        />
      </div>

      <div class="flex sm:justify-end align-center items-center mt-4 sm:mt-0">
        <p class="mx-1">Sort by :</p>
        <div
          @click="sortBy('rating')"
          :class="sortClass('rating')"
          class="sort mx-1 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow"
        >
          <span>Rating</span>
        </div>
        <div
          @click="sortBy('memo')"
          :class="sortClass('memo')"
          class="sort mx-1 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow"
        >
          <span>Memo</span>
        </div>
      </div>
    </div>
    <VideoList :result="result" :tableId="tableId" />
    <!-- <ul>
      <li
        v-for="item in result"
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
            <star-rating
              v-bind:increment="0.5"
              v-bind:max-rating="5"
              inactive-color="#ccc"
              active-color="#f9d71c"
              v-bind:star-size="10"
              :rating="parseFloat(item.fields.rating)"
              :show-rating="false"
              read-only
            >
            </star-rating>
          </div>
        </div>
        <p v-if="item.fields.memo" class="m-1 p-1 bg-gray-300">
          {{ item["fields"]["memo"] | itemMemo }}
        </p>
      </li>
    </ul> -->
  </div>
</template>

<script>
// import StarRating from "vue-star-rating";

export default {
  // components: {
  //   StarRating
  // },
  data() {
    return {
      items: [],
      tableId: "",
      sort: {
        key: "memo",
        isAsc: true
      },
      filterName: "",
      rating: 3,
      airTablePlayListData: []
    };
  },
  created() {
    const currentId = this.$nuxt.$route.params.id;
  },
  async fetch({ store, route }) {
    const dispatchInfo = {
      tableId: route.query.name,
      currentPage: "VideoList",
      recordId: ""
    };
    await store.dispatch("fetchAirTableData", dispatchInfo);
  },
  async mounted() {
    this.tableId = this.$nuxt.$route.query.name;
    await this.$nextTick(() => {
      setTimeout(() => {
        this.setVideoLength();
      }, 1000);
    });
  },
  computed: {
    playLists() {
      return this.$store.getters["airTablePlayList"];
    },
    videoLists() {
      return this.$store.getters["airTableVideoList"];
    },
    result() {
      let list = this.videoLists.slice();

      if (this.filterName) {
        list = list.filter(
          item => item.fields.Title.indexOf(this.filterName) > -1
        );
      }

      if (this.sort.key) {
        list.sort((a, b) => {
          a = a.fields[this.sort.key];
          b = b.fields[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }

      return list;
    }
  },
  // filters: {
  //   itemTitle(val) {
  //     if (val) {
  //       return `${val.substring(0, 50)}...`;
  //     } else {
  //       return;
  //     }
  //   },
  //   itemMemo(val) {
  //     if (val) {
  //       return `${val.substring(0, 70)}...`;
  //     } else {
  //       return;
  //     }
  //   }
  // },
  methods: {
    videoListsLength() {
      return this.$store.getters["airTableVideoList"].length;
    },
    videoMemoLength() {
      const items = this.$store.getters["airTableVideoList"];
      const filteredItems = items.filter(item => {
        return item.fields.memo !== "";
      });
      return filteredItems.length;
    },
    setVideoLength() {
      if (this.playLists.length > 0) {
        const filteredPlayList = this.playLists.filter(list => {
          return list.fields.Name === this.tableId;
        });
        const recordId = filteredPlayList[0].id;
        var self = this;
        var app_id = process.env.AIRTABLE_APP_ID;
        var app_key = process.env.AIRTABLE_API_KEY;
        var tableId = "PlayListIndex";

        const data = {
          records: [
            {
              id: recordId,
              fields: {
                memoLength: this.videoMemoLength(),
                videoLength: this.videoListsLength()
              }
            }
          ]
        };
        this.items = [];
        this.$axios
          .patch(
            "https://api.airtable.com/v0/" + app_id + "/" + tableId,
            data,
            {
              headers: {
                Authorization: "Bearer " + app_key,
                "Content-Type": "application/json"
              }
            }
          )
          .then(function(response) {
            self.items = response.data.records;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    sortBy(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : true;
      this.sort.key = key;
    },
    sortClass(key) {
      return this.sort.key === key
        ? `sort ${this.sort.isAsc ? "asc" : "desc"}`
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.sort.desc:after {

  margin-left: 4px;
  display: inline-block;
  content: "▽";
}

.sort.asc:after {
  margin-left: 4px;
  display: inline-block;
  content: "△";
}
</style>
