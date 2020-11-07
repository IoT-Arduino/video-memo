import Vuex from "vuex";
import firebase from "@/plugins/firebase";

export default () =>
  new Vuex.Store({
    state: {
      playLists: [],
      videoLists1: [],
      videoLists2: [],
      currentVideo: []
    },
    getters: {
      playLists: state => state.playLists,
      videoLists1: state => state.videoLists1,
      videoLists2: state => state.videoLists2,
      currentVideo: state => state.currentVideo
    },
    mutations: {
      setPlayLists(state, { playLists }) {
        state.playLists = playLists;
      },
      setVideoLists1(state, videoLists) {
        state.videoLists1 = videoLists;
      },
      setVideoLists2(state, videoLists) {
        state.videoLists2 = videoLists;
      },
      setCurrentVideo(state, payload) {
        state.currentVideo = payload;
      }
    },
    actions: {
      //　index.vue で使用
      async fetchPlayLists({ commit }) {
        const fetchPlayLists = await this.$axios.$get("/api/channelSections", {
          params: {
            part: "contentDetails",

            channelId: "UCkli32c5AWOAReJmPnbEs6w",
            // maxResults: 40,
            // key: process.env.YOUTUBE_API_KEY,
            key: "AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE"
          }
        });
        console.log(fetchPlayLists.items[1]);
        const playLists = fetchPlayLists.items[1].contentDetails["playlists"];
        commit("setPlayLists", { playLists });
      },

      //　playList/_id.vue で使用
      async fetchVideoLists({ commit }, id) {
        const fetchVideoLists = await this.$axios.$get("/api/playlistItems", {
          params: {
            part: "snippet",

            playlistId: id,
            maxResults: 40,
            // key: process.env.YOUTUBE_API_KEY,
            key: "AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE",
            regionCode: "JP"
            // type: "video",
            // chart: 'mostPopular'
          }
        });

        const videoLists = fetchVideoLists.items.map((item, index) => {
          return item;
        });
        // console.log(videoLists[2]);

        commit("setVideoLists1",  videoLists );
      },
      //　playList/_id.vue で使用
      async saveVideoLists(videoData) {
        const db = firebase.firestore();
        // onSnapShot でリアルタイムのメモの変更を検知する。
        const firebaseVideos = await db.collection("videoLists");

        videoData.forEach(video => {
          firebaseVideos
            .set({
              playlistId: video.snippet.playlistId,
              movieId: video.id,
              title: video.snippet.title,
              thumbnail: video.snippet.thumbnails.default.url,
              description: video.snippet.description.slice(0, 140),
              memo: ""
            })
            .then(ref => {
              console.log("Add ID: ", ref);
            });
        })
      },
      //　playList/_id.vue で使用
      async setVideoLists({ commit }) {
        // state を取得して、firebaseに書き込む処理が必要
        // 引数で取得するか、stateから直接取るか?
        const db = firebase.firestore();
        const memoData = [];
        // onSnapShot でリアルタイムのメモの変更を検知する。
        const memos = await db.collection("videoLists").get();

        // 条件を加える
        //　もし、firebaseに同じデータがあれば更新しない。

        await memos.forEach(doc => {
          const id = doc.id;
          const memo = doc.data();
          memoData.push({ ...memo, id });
        });
        // console.log(memoData);
        commit("setVideoLists2", memoData);
      },

      //　参考
      // async updateVideoLists(state, videos) {
      //   const db = firebase.firestore();
      //   let memos = await db.collection("videoLists");

      //   videos.forEach(video => {
      //     memos
      //       .add({
      //         playlistId: video.snippet.playlistId,
      //         movieId: video.id,
      //         title: video.snippet.title,
      //         thumbnail: video.snippet.thumbnails.default.url,
      //         description: video.snippet.description.slice(0, 140),
      //         memo: ""
      //       })
      //       .then(ref => {
      //         // console.log("Add ID: ", ref.id);
      //       });
      //   });
      // },

      // videos/_id.vue で使用
      async setCurrentVideo({ commit }, id) {
        const db = firebase.firestore();
        // let currentMemo = "";
        console.log(id);
        const memo = await db
          .collection("videoLists")
          .where("movieId", "==", id)
          .get();

        await memo.forEach(doc => {
          const currentMemo = doc.data();
          const id = doc.id;

          console.log({ id, ...currentMemo });
          commit("setCurrentVideo", { id, ...currentMemo });
        });
      },

      // videos/_id.vue で使用
      async editNote({ commit }, memo) {
        const db = firebase.firestore();
        const id = memo.id;

        let firebaseMemo = await db.collection("videoLists").doc(id);

        firebaseMemo
          .update({
            memo: memo.memoData
          })
          .then(ref => {
            console.log("Add ID: ", ref);
          });
      }
    }
  });
