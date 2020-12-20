<template>
  <div class="container mx-auto">
    <div class="container__list">
      <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
        <p>All PlayLists</p>
      </div>

      <ul class="mb-6">
        <li
          class="border list-none rounded-sm px-3 py-3 flex items-center playList"
          v-for="item in playLists"
          :key="item.id"
        >
          <font-awesome-icon :icon="['fas', 'list']" />
          <nuxt-link
            :to="
              `/VideoList/${item.fields.PlayListId}?name=${item.fields.Name}`
            "
            class="ml-2 hover:font-bold"
          >
            <div class="flex justify-between items-center">
              <h3>{{ item["fields"]["Name"] }}</h3>
              <p class="ml-5">
                {{ item["fields"]["memoLength"] ?  item["fields"]["memoLength"] : 0}}/{{
                  item["fields"]["videoLength"]
                }}
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";

export default {
  // async asyncData({ store }) {
  //   const dispatchInfo = {
  //     tableId: "PlayListIndex",
  //     currentPage: "index",
  //     recordId: ""
  //   };
  //   await store.dispatch("fetchAirTableData", dispatchInfo);
  // },
  async fetch({ store }) {
    const dispatchInfo = {
      tableId: "PlayListIndex",
      currentPage: "index",
      recordId: ""
    };
    await store.dispatch("fetchAirTableData", dispatchInfo);
  },
  async mounted() {
    this.currentPage = $nuxt.$route.path;
    await auth().onAuthStateChanged(user => {
      this.isLogin = user ? true : false;
      if (user) {
        this.currentUser = user.email;
      }
    });
  },
  data() {
    return {
      items: [],
      isLogin: false,
      currentPage: "",
      currentUser: ""
    };
  },
  computed: {
    playLists() {
      return this.$store.getters["airTablePlayList"];
    }
  }
};
</script>

<style lang="scss" scoped>
.container__list,
.container__item {
  margin: 16px;
}

.playList:not(:last-child) {
  border-bottom: none;
}
</style>
