import Vuex from "vuex";

export default () =>
  new Vuex.Store({
    state: {
      airTableData: [],
      airTableRecord: {},
      YoutubePlayLists: [],
      YoutubeVideoLists: []
    },
    getters: {
      airTableData: state => state.airTableData,
      airTableRecord: state => state.airTableRecord,
      YoutubePlayLists: state => state.YoutubePlayLists,
      YoutubeVideoLists: state => state.YoutubeVideoLists
    },
    mutations: {
      setAirTableData(state, airTableData) {
        state.airTableData = airTableData;
      },
      setAirTableRecord(state, airTableRecord) {
        state.airTableRecord = airTableRecord;
      },
      setYoutubePlayLists(state, { YoutubePlayLists }) {
        state.YoutubePlayLists = YoutubePlayLists;
      },
      setYoutubeVideoLists(state, YoutubeVideoLists) {
        state.YoutubeVideoLists = YoutubeVideoLists;
      }
    },
    actions: {
      async fetchAirTableData({ commit }, dispatchInfo) {
        const app_id = process.env.AIRTABLE_APP_ID;
        const app_key = process.env.AIRTABLE_API_KEY;
        const table_id = dispatchInfo.tableId;

        let items = [];
        this.$axios
          .get(
            "https://api.airtable.com/v0/" +
              app_id +
              "/" +
              table_id +
              "?view=Grid%20view",
            {
              headers: {
                Authorization: "Bearer " + app_key
              }
            }
          )
          .then(function(response) {
            items = response.data.records;

            if (dispatchInfo.currentPage === "index") {
              commit("setAirTableData", items);
            }

            if (dispatchInfo.currentPage === "VideoList") {
              let addMemoItems = [];
              const filteredItems = items.filter((item, index) => {
                if (item.fields.Title == "Deleted video") {
                  console.log(`Video:${index} has deleted`);
                }
                return item.fields.Title != "Deleted video";
              });

              filteredItems.forEach(data => {
                if (!data.fields.memo) {
                  data.fields.memo = "";
                }
                addMemoItems.push(data);
              });

              items = addMemoItems;
              commit("setAirTableData", items);
            }

            if (dispatchInfo.currentPage === "VideoPage") {
              let filteredItem = {}
              filteredItem = items.find(record => {
                return record.id == dispatchInfo.recordId;
              });
              const airTableRecord = {
                memo: filteredItem.fields.memo ?filteredItem.fields.memo : "" ,
                Title: filteredItem.fields.Title
              };
              commit("setAirTableRecord", airTableRecord);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
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

        commit("setYoutubeVideoLists", videoListsAll);
      }
    }
  });
