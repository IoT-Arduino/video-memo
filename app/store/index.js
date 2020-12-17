import Vuex from "vuex";

export default () =>
  new Vuex.Store({
    state: {
      YoutubePlayLists: [],
      YoutubeVideoLists: [],
    },
    getters: {
      YoutubePlayLists: state => state.YoutubePlayLists,
      YoutubeVideoLists: state => state.YoutubeVideoLists,
    },
    mutations: {
      setYoutubePlayLists(state, { YoutubePlayLists }) {
        state.YoutubePlayLists = YoutubePlayLists;
      },
      setYoutubeVideoLists(state, YoutubeVideoLists) {
        state.YoutubeVideoLists = YoutubeVideoLists;
      },
    },
    actions: {
      async fetchYoutubePlayLists({ commit }) {
        const fetchYoutubePlayLists = await this.$axios.$get(
          "/api/channelSections",
          {
            params: {
              part: "contentDetails",
              channelId: "UCkli32c5AWOAReJmPnbEs6w",
              maxResults: 50,
              key: process.env.YOUTUBE_API_KEY
            }
          }
        );
        console.log(fetchYoutubePlayLists.items[1]);
        const YoutubePlayLists =
          fetchYoutubePlayLists.items[1].contentDetails["playlists"];
        commit("setYoutubePlayLists", { YoutubePlayLists });
      },

      async fetchYoutubeVideoLists({ commit }, id) {
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
                key: process.env.YOUTUBE_API_KEY
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

        // console.log(videoListsAll);

        commit("setYoutubeVideoLists", videoListsAll);
      }
    }
  });
