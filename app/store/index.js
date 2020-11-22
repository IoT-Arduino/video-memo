import Vuex from "vuex";
import { auth } from "@/plugins/firebase";

export default () =>
  new Vuex.Store({
    state: {
      playLists: [],
      videoLists: [],
      currentVideo: [],
      user: null
    },
    getters: {
      playLists: state => state.playLists,
      videoLists: state => state.videoLists,
      currentVideo: state => state.currentVideo,
      user(state) {
        return state.user;
      },
      isAuthenticated(state) {
        return !!state.user;
      }
    },
    mutations: {
      setPlayLists(state, { playLists }) {
        state.playLists = playLists;
      },
      setVideoLists(state, videoLists) {
        state.videoLists = videoLists;
      },
      setCurrentVideo(state, payload) {
        state.currentVideo = payload;
      },
      setUser(state, payload) {
        state.user = payload;
      }
    },
    actions: {
      signInWithEmail({ commit }, { email, password }) {
        return auth().signInWithEmailAndPassword(email, password);
      },
      signOut() {
        return auth().signOut();
      },
      //　index.vue で使用
      async fetchPlayLists({ commit }) {
        const fetchPlayLists = await this.$axios.$get("/api/channelSections", {
          params: {
            part: "contentDetails",
            channelId: "UCkli32c5AWOAReJmPnbEs6w",
            maxResults: 50,
            key: process.env.YOUTUBE_API_KEY,
          }
        });
        console.log(fetchPlayLists.items[1]);
        const playLists = fetchPlayLists.items[1].contentDetails["playlists"];
        commit("setPlayLists", { playLists });
      },

      //　youtubePlayList/_id.vue で使用
      async fetchVideoLists({ commit }, id) {
        const fetchVideoLists = await this.$axios.$get("/api/playlistItems", {
          params: {
            part: "snippet",
            playlistId: id,
            maxResults: 50,
            key: process.env.YOUTUBE_API_KEY
          }
        });

        let videoLists2 = [];

        if (fetchVideoLists.nextPageToken) {
          console.log(fetchVideoLists.nextPageToken);
          const fetchVideoLists2 = await this.$axios.$get(
            "/api/playlistItems",
            {
              params: {
                part: "snippet",
                playlistId: id,
                maxResults: 50,
                pageToken: fetchVideoLists.nextPageToken,
                key: process.env.YOUTUBE_API_KEY,
              }
            }
          );
          videoLists2 = fetchVideoLists2.items.map((item, index) => {
            return item;
          });
        }
        let videoLists = fetchVideoLists.items.map((item, index) => {
          return item;
        });

        let videoListsAll = [];
        if (videoLists2.length) {
          videoListsAll = videoLists.concat(videoLists2);
        } else {
          videoListsAll = videoLists;
        }

        console.log(videoListsAll)

        commit("setVideoLists", videoListsAll);
      }
    }
  });
