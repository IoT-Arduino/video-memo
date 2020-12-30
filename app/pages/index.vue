<template>
  <div class="container mx-auto">
    <div class="container__list">
      <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
        <p>All PlayLists</p>
      </div>

      <ul class="mb-6">
        <li
          class="border list-none rounded-sm px-3 py-3 playList flex justify-between items-center"
          v-for="item in playLists"
          :key="item.id"
        >
          <div class="flex items-center">
            <font-awesome-icon :icon="['fas', 'list']" />
            <nuxt-link
              :to="
                `/VideoList/${item.fields.name}`
              "
              class="ml-2 hover:font-bold"
            >
              <h3 class="block sm:hidden">{{ item.fields.name.substring(0,17) }}</h3>
              <h3 class="hidden sm:block">{{ item.fields.name }}</h3>
            </nuxt-link>
          </div>
          <p class="ml-5" v-if="item.fields.videoLength > 0">
            {{
              item.fields.memoLength ? item.fields.memoLength : 0
            }}/{{ item.fields.videoLength }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";
import settingData from "@/util/settingData"

export default {
  async fetch({ store }) {
    const dispatchInfo = {
      tableId: settingData.indexTableName,
      currentPage: "index",
      recordId: ""
    };
    await store.dispatch("fetchAirTableData", dispatchInfo);
  },
  data() {
    return {
      isLogin: false,
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
