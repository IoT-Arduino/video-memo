(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{125:function(t,e,n){"use strict";e.a=function(t){t.$axios.onRequest((function(t){return t.headers.common.Authorization="AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE",t}))}},126:function(t,e,n){"use strict";var r=n(0),o=n(183),c=n.n(o);r.a.use(c.a)},127:function(t,e,n){"use strict";n(7);var r=n(41);e.a=function(t){var e=t.store;return new Promise((function(t,n){Object(r.a)().onAuthStateChanged((function(n){e.commit("setUser",n),t()}))}))}},178:function(t,e,n){"use strict";n.r(e);var r={props:["isLoginPage"],methods:{signOut:function(t){var e=this;this.$store.dispatch("signOut").then((function(){e.$router.push("/login")})).catch((function(t){alert(t.message)}))}}},o=n(36),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"p-3 mb-2 bg-green-400 text-white"},[e("div",{staticClass:"flex justify-between items-center"},[this._m(0),this._v(" "),this.isLoginPage?this._e():e("div",{staticClass:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",on:{click:this.signOut}},[this._v("\n      ログアウト\n    ")])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"hover:text-green-800",attrs:{href:"/"}},[e("h1",{staticClass:"text-xl font-semibold"},[this._v("ゴルフ理論解体新書")])])}],!1,null,"4e70bfd9",null);e.default=component.exports;installComponents(component,{Header:n(178).default})},185:function(t,e,n){"use strict";n(19),n(74),n(42);var r=n(6),o={mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$nuxt.$route.path;case 2:t.currentPage=e.sent,function(){t.currentPage.match(/login/)?t.isLoginPage=!0:t.isLoginPage=!1};case 4:case"end":return e.stop()}}),e)})))()},data:function(){return{isLoginPage:!1,currentPage:""}},methods:{}},c=(n(222),n(36)),component=Object(c.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"max-w-2xl mx-auto"},[e("Header",{attrs:{isLoginPage:this.isLoginPage}}),this._v(" "),e("Nuxt")],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{Header:n(178).default})},187:function(t,e,n){n(188),t.exports=n(189)},208:function(t,e,n){"use strict";n.r(e);n(19),n(74);e.default=function(t){var e=t.store,n=t.route,r=t.redirect;console.log("route-path",n.path);var o=!1;o=!!n.path.match(/login/),e.getters.isAuthenticated||o||(r("/login"),console.log(e.getters.isAuthenticated)),e.getters.isAuthenticated&&o&&(r("/"),console.log(e.getters.isAuthenticated))}},222:function(t,e,n){"use strict";var r=n(97);n.n(r).a},223:function(t,e,n){(e=n(60)(!1)).push([t.i,'html{font-family:"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:16px;word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box}*,:after,:before{box-sizing:border-box;margin:0}',""]),t.exports=e},224:function(t,e,n){"use strict";n.r(e);n(33),n(34),n(42);var r=n(6),o=n(47),c=n(41);e.default=function(){return new o.a.Store({state:{playLists:[],videoLists:[],currentVideo:[],user:null},getters:{playLists:function(t){return t.playLists},videoLists:function(t){return t.videoLists},currentVideo:function(t){return t.currentVideo},user:function(t){return t.user},isAuthenticated:function(t){return!!t.user}},mutations:{setPlayLists:function(t,e){var n=e.playLists;t.playLists=n},setVideoLists:function(t,e){t.videoLists=e},setCurrentVideo:function(t,e){t.currentVideo=e},setUser:function(t,e){t.user=e}},actions:{signInWithEmail:function(t,e){t.commit;var n=e.email,r=e.password;return Object(c.a)().signInWithEmailAndPassword(n,r)},signOut:function(){return Object(c.a)().signOut()},fetchPlayLists:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.commit,n.next=3,e.$axios.$get("/api/channelSections",{params:{part:"contentDetails",channelId:"UCkli32c5AWOAReJmPnbEs6w",maxResults:50,key:"AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE"}});case 3:o=n.sent,console.log(o.items[1]),c=o.items[1].contentDetails.playlists,r("setPlayLists",{playLists:c});case 7:case"end":return n.stop()}}),n)})))()},fetchVideoLists:function(t,e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var o,c,l,f,m,h;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,n.$axios.$get("/api/playlistItems",{params:{part:"snippet",playlistId:e,maxResults:50,key:"AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE"}});case 3:if(c=r.sent,l=[],!c.nextPageToken){r.next=11;break}return console.log(c.nextPageToken),r.next=9,n.$axios.$get("/api/playlistItems",{params:{part:"snippet",playlistId:e,maxResults:50,pageToken:c.nextPageToken,key:"AIzaSyDDYIhiUvrD2SiuOkZi1RhsJWjzhw9etiE"}});case 9:f=r.sent,l=f.items.map((function(t,e){return t}));case 11:m=c.items.map((function(t,e){return t})),h=[],h=l.length?m.concat(l):m,console.log(h),o("setVideoLists",h);case 16:case"end":return r.stop()}}),r)})))()}}})}},41:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(77),o=n.n(r);n(225),n(227);o.a.apps.length||o.a.initializeApp({apiKey:"AIzaSyBy2YwdqUjB1N07cDJsQV0DtxYjsUSXc-Q",authDomain:"movie-memo-a810f.firebaseapp.com",databaseURL:"https://movie-memo-a810f.firebaseio.com",projectId:"movie-memo-a810f",storageBucket:"movie-memo-a810f.appspot.com",messagingSenderId:"357306995010",appId:"1:357306995010:web:dc39b2d329213ebbd738db",measurementId:"G-XVBT8FDZEP"});var c=o.a.auth;e.b=o.a},97:function(t,e,n){var content=n(223);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("49bfeda0",content,!0,{sourceMap:!1})}},[[187,8,1,9]]]);