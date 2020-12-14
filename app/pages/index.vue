<template>
  <div class="container">
    <div class="container__list">
      <div class="border-l-4 border-red-400 -ml-6 pl-6 items-center mt-4 mb-6">
        <p>All PlayLists</p>
      </div>

      <ul class="mb-6">
        <li
          class="border list-none  rounded-sm px-3 py-3 hover:bg-green-200 "
          style="border-bottom-width:0"
          v-for="item in items"
          :key="item.id"
        >
          <nuxt-link
            :to="
              `/VideoList/${item.fields.PlayListId}?name=${item.fields.Name}`
            "
          >
            <h3>{{ item["fields"]["Name"] }}</h3>
            <p>
              {{ item["fields"]["PlayListId"] }}
            </p>
          </nuxt-link>
          <span>
            {{ item["fields"]["memo"] }}
          </span>
        </li>
      </ul>
    </div>
    <input
      type="submit"
      value="Logout"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      @click="signOut"
    />

        <div class="container__item">
      <nuxt-link :to="'/youtubePlayList'">YoutubePlayList</nuxt-link>
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
      // isLoginPage: false,
      currentPage: "",
      currentUser:""
    };
  },
  async mounted() {
    this.currentPage = $nuxt.$route.path;
    this.loadItems();

    await auth().onAuthStateChanged(
      // user => (this.isLogin = user ? true : false)
      user => {
        this.isLogin = user ? true : false
        this.currentUser = user.email
        console.log(user.email)
        }
    );
  },
  methods: {
    loadItems: function() {
      // Init variables
      var self = this;
      var app_id = process.env.AIRTABLE_APP_ID;
      var app_key = process.env.AIRTABLE_API_KEY;
      var table_id = "再生リスト一覧";
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
    },
    async signOut(err) {
      await auth().signOut();
      this.$router.push("/login");
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playLists;
    }
  }
};
</script>

<style>
.container__list,
.container__item {
  margin: 16px;
}
</style>
