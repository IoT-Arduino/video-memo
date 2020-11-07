<template>
  <div>
    <youtube ref="youtube" :video-id="videoId" />
    <p>{{ $route.params.id }}</p>
    <img :src="currentVideo.thumbnail" alt="" />
    <p>{{ currentVideo.title }}</p>
    <p>{{ currentVideo.description }}</p>
    <div>{{ currentVideo.id }}</div>
    <p>{{ currentVideo.memo }}</p>
    <form class="form" @submit.prevent="submit">
      <input type="text" v-model="memo" />
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
export default {
  created: function() {
    const currentId = this.$nuxt.$route.params.id;
    this.$store.dispatch("setCurrentVideo", currentId);
  },
  data() {
    return {
      videoId: this.$nuxt.$route.params.id,
      memo: ""
    };
  },
  computed: {
    currentVideo() {
      return this.$store.getters["currentVideo"];
    },
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    submit() {
      console.log(this.currentVideo.id);
      // const memo = {
      //   id : this.currentVideo.id,
      //   movieId: this.$nuxt.$route.params.id,
      //   memoData: this.memo
      // };

      // Init variables
      var self = this;
      var recordId = "recWKAtHNxnanNUgF";
      var app_id = "applalJUP0IngU6jQ";
      var app_key = "keyd5fbLuMg5nDqdT";
      const data = {
        records: [
          {
            id: recordId,
            fields: {
              VideoId: this.$nuxt.$route.params.id,
              memo: this.memo
            }
          }
        ]
      };
      this.items = [];
      this.$axios
        .patch("https://api.airtable.com/v0/" + app_id + "/youtube", data, {
          headers: {
            Authorization: "Bearer " + app_key,
            "Content-Type": "application/json"
          }
        })
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

<style></style>
