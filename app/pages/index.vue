<template>
  <v-app>
    <v-container class="container">
      <div class="container__list">
        <p>ゴルフ理論「解体新書」PlayLists</p>
        <p></p>
        <ul class="mb-6">
          <li cols="12" v-for="item in items" :key="item.id">
            <h3>{{ item["fields"]["Name"] }}</h3>
            <nuxt-link
              :to="
                `/airtableList/${item.fields.PlayListId}?name=${item.fields.Name}`
              "
            >
              {{ item["fields"]["PlayListId"] }}
            </nuxt-link>
            <span>
              {{ item["fields"]["memo"] }}
            </span>
          </li>
        </ul>
      </div>

      <!-- <div class="container__list">
      <p>Youtube ChannelLists Top Page　/ データ取得用</p>
      <ul v-for="playlist in playlists" :key="playlist.id">
        <li>
          {{ playlist }}
          <nuxt-link :to="`/youtubePlayList/${playlist}`">
            {{ playlist }}
          </nuxt-link>
        </li>
      </ul>
    </div> -->

      <div class="container__list">
        <nuxt-link :to="'/firebase/'">
          firebase
        </nuxt-link>
      </div>

      <div class="pa-5">
        <v-btn block outlined color="grey darken-3" @click="signOut">
          ログアウト
        </v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // async asyncData({ store }) {
  //   if (store.getters["playLists"].length) {
  //     return;
  //   }
  //   await store.dispatch("fetchPlayLists");
  //   console.log(store.state.playLists);
  // },
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
    getUserStatus(){
      const userStatus = this.$store.getters["isAuthenticated"]
      const userName = this.$store.getters["user"]
      console.log(userStatus)
      console.log(userName)
    },
    loadItems: function() {
      // Init variables
      var self = this;
      var app_id = "applalJUP0IngU6jQ";
      var app_key = "keyd5fbLuMg5nDqdT";
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
          console.log(self.items);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     signOut: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playLists;
    }
    // ...mapGetters(['playLists'])
  }
};
</script>

<style>
.container__list {
  margin: 16px;
}
</style>
