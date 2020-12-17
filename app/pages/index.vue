<template>
  <div class="container mx-auto">
    <div class="container__list">
      <div class="border-l-4 border-red-400 -ml-1 pl-6 items-center mt-4 mb-6">
        <p>All PlayLists</p>
      </div>

      <ul class="mb-6">
        <li
          class="border list-none rounded-sm px-3 py-3 flex items-center playList"

          v-for="item in items"
          :key="item.id"
        >
          <font-awesome-icon :icon="['fas', 'list']" />
          <nuxt-link
            :to="
              `/VideoList/${item.fields.PlayListId}?name=${item.fields.Name}`
            "
            class="ml-2 hover:font-bold"
          >
            <h3>{{ item["fields"]["Name"] }}</h3>
            <p></p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { firebase, auth } from "@/plugins/firebase";

export default {
  data() {
    return {
      items: [],
      isLogin: false,
      currentPage: "",
      currentUser: ""
    };
  },
  async mounted() {
    this.currentPage = $nuxt.$route.path;
    this.loadItems();

    await auth().onAuthStateChanged(user => {
      this.isLogin = user ? true : false;
      if (user) {
        this.currentUser = user.email;
        console.log(user.email);
      }
    });
  },
  methods: {
    loadItems: function() {
      // Init variables
      var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var table_id = "PlayListIndex";

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
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playLists;
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
