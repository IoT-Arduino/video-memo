import Vuex from "vuex";
import { firebase, auth } from "@/plugins/firebase";

export default () =>
  new Vuex.Store({
    state: {
      airTablePlayList: [],
      airTableVideoList: [],
      airTableRecord: {},
      YoutubePlayLists: [],
      YoutubeVideoLists: [],
    },
    getters: {
      airTablePlayList: state => state.airTablePlayList,
      airTableVideoList: state => state.airTableVideoList,
      airTableRecord: state => state.airTableRecord,
      YoutubePlayLists: state => state.YoutubePlayLists,
      YoutubeVideoLists: state => state.YoutubeVideoLists,
    },
    mutations: {
      setAirTablePlayList(state, airTablePlayList) {
        state.airTablePlayList = airTablePlayList;
      },
      setAirTableVideoList(state, airTableVideoList) {
        state.airTableVideoList = airTableVideoList;
      },
      setAirTableRecord(state, airTableRecord) {
        state.airTableRecord = airTableRecord;
      },
      setYoutubePlayLists(state, { YoutubePlayLists }) {
        state.YoutubePlayLists = YoutubePlayLists;
      },
      setYoutubeVideoLists(state, YoutubeVideoLists) {
        state.YoutubeVideoLists = YoutubeVideoLists;
      },
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
              commit("setAirTablePlayList", items);
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
                if (!data.fields.rating) {
                  data.fields.rating = 0;
                }
                addMemoItems.push(data);
              });

              items = addMemoItems;

              commit("setAirTableVideoList", items);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      async fetchAirTableRecord({ commit }, dispatchInfo) {
        const app_id = process.env.AIRTABLE_APP_ID;
        const app_key = process.env.AIRTABLE_API_KEY;
        const table_id = dispatchInfo.tableId;
        const record_id = dispatchInfo.recordId;

        let item = [];
        this.$axios
          .get(
            "https://api.airtable.com/v0/" +
              app_id +
              "/" +
              table_id +
              "/" +
              record_id,

            {
              headers: {
                Authorization: "Bearer " + app_key
              }
            }
          )
          .then(function(response) {
            item = response.data;

            const airTableRecord = {
              memo: item.fields.memo ? item.fields.memo : "",
              rating: item.fields.rating ? item.fields.rating : 0,
              Title: item.fields.Title
            };
            commit("setAirTableRecord", airTableRecord);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      async fetchYoutubePlayLists({ commit }) {
        const fetchYoutubePlayLists = await this.$axios.$get(
          "https://www.googleapis.com/youtube/v3/channelSections",
          {
            params: {
              part: "contentDetails",
              channelId: "UCkli32c5AWOAReJmPnbEs6w",
              maxResults: 50,
              key: process.env.YOUTUBE_API_KEY
            }
          }
        );
        const YoutubePlayLists =
          fetchYoutubePlayLists.items[1].contentDetails["playlists"];
        commit("setYoutubePlayLists", { YoutubePlayLists });
      },
      async fetchYoutubeVideoLists({ commit }, id) {
        const fetchVideoLists = await this.$axios.$get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              playlistId: id,
              maxResults: 50,
              key: process.env.YOUTUBE_API_KEY
            }
          }
        );

        let videoLists2 = [];

        if (fetchVideoLists.nextPageToken) {
          // console.log(fetchVideoLists.nextPageToken);
          const fetchVideoLists2 = await this.$axios.$get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
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
      },
    }
  });
