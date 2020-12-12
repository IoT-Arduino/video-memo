<template>
  <div class="container">
    <div class="container__list">
      <div class="border-l-4 border-red-400 -ml-6 pl-6 items-center mt-4 mb-6">
        <p>ゴルフ理論「解体新書」PlayLists</p>
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

    <div class="container__item">
      <nuxt-link :to="'/youtubePlayList'">YoutubePlayList</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: []
    };
  },
  mounted: function() {
    this.loadItems();
    this.getUserStatus();
  },
  methods: {
    getUserStatus() {
      const userStatus = this.$store.getters["isAuthenticated"];
      const userName = this.$store.getters["user"];
      console.log(userStatus);
      console.log(userName);
    },
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
    signOut: function(err) {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          alert(err.message);
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

<style>
.container__list,
.container__item {
  margin: 16px;
}
</style>
