<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
      :backgroundColor="'#fff'"
      :opacity="1"
      :color="'#38feb8'"
    ></loading>
    <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
      <p>PlayList : {{ tableId }}</p>
    </div>

    <div class="filter-sort mx-2 my-5 sm:flex justify-between align-center">
      <div class="border-2 w-3/5 sm:w-2/5">
        <input
          placeholder="Filter by Title"
          type="text"
          v-model="filterName"
          name="filter"
          class="border-2 w-full p-0"
        />
      </div>

      <div class="flex sm:justify-end align-center items-center mt-4 sm:mt-0">
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
        <div
          v-if="isPublishedAt"
          @click="sortBy('publishedAt')"
          :class="sortClass('publishedAt')"
          class="sort mx-1 cursor-pointer px-3 py-1 bg-gray-300 hover:bg-green-500 hover:text-white rounded text-center shadow"
        >
          <span>PublishedAt</span>
        </div>
      </div>
    </div>
    <VideoList :result="result" :tableId="tableId" />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import settingData from "@/util/settingData";

export default {
  components: {
    loading: Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: false,
      items: [],
      tableId: "",
      sort: {
        key: "memo",
        isAsc: true
      },
      filterName: "",
      isPublishedAt: null
    };
  },
  // async fetch({ store, route }) {
  //   const dispatchInfo = {
  //     tableId: route.params.id,
  //     currentPage: "VideoList",
  //     recordId: ""
  //   };
  //   await store.dispatch("fetchAirTableData", dispatchInfo);
  // },
  async mounted() {
    this.isLoading = true;
    this.tableId = this.$nuxt.$route.params.id;

    const dispatchInfo = {
      tableId: this.tableId,
      currentPage: "VideoList",
      recordId: ""
    };
    await this.$store.dispatch("fetchAirTableData", dispatchInfo);

    this.$store.watch(
      () => this.$store.getters["airTableVideoList"],
      value => {
        this.isLoading = false;
      }
    );

    setTimeout(() => {
      this.setVideoLength();
      this.checkPublishedAt();
    }, 800);
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
          item =>
            item.fields.title
              .toLowerCase()
              .indexOf(this.filterName.toLowerCase()) > -1
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

  methods: {
    // check for display publisheAt sortButton or not
    async checkPublishedAt() {
      const items = await this.videoLists.filter(item => {
        return item.fields.publishedAt !== "";
      });
      (await items.length) !== 0
        ? (this.isPublishedAt = true)
        : (this.isPublishedAt = false);
    },
    // -- aquire video length data to display on the top page --
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
          return list.fields.name === this.tableId;
        });

        const recordId = filteredPlayList[0].id;
        const self = this;
        const app_id = process.env.AIRTABLE_APP_ID;
        const app_key = process.env.AIRTABLE_API_KEY;
        const tableId = settingData.indexTableName;

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
          .then(response => {
            const items = response.data.records;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // ----end--
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
