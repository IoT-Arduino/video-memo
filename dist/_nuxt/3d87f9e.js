(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{290:function(t,n,e){var content=e(305);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(67).default)("54fd328b",content,!0,{sourceMap:!1})},304:function(t,n,e){"use strict";var o=e(290);e.n(o).a},305:function(t,n,e){(n=e(66)(!1)).push([t.i,".container__item,.container__list{margin:16px}",""]),t.exports=n},326:function(t,n,e){"use strict";e.r(n);var o={data:function(){return{items:[]}},mounted:function(){this.loadItems(),this.getUserStatus()},methods:{getUserStatus:function(){var t=this.$store.getters.isAuthenticated,n=this.$store.getters.user;console.log(t),console.log(n)},loadItems:function(){var t=this;this.items=[],this.$axios.get("https://api.airtable.com/v0/applalJUP0IngU6jQ/再生リスト一覧?view=Grid%20view",{headers:{Authorization:"Bearer keyd5fbLuMg5nDqdT"}}).then((function(n){t.items=n.data.records})).catch((function(t){console.log(t)}))},signOut:function(t){var n=this;this.$store.dispatch("signOut").then((function(){n.$router.push("/login")})).catch((function(t){alert(t.message)}))}},computed:{playlists:function(){return this.$store.state.playLists}}},l=(e(304),e(58)),r=e(285),c=e.n(r),d=e(298),v=e(320),component=Object(l.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-app",[e("div",{staticClass:"container"},[e("div",{staticClass:"container__list"},[e("p",[t._v("ゴルフ理論「解体新書」PlayLists")]),t._v(" "),e("p"),t._v(" "),e("ul",{staticClass:"mb-6"},t._l(t.items,(function(n){return e("li",{key:n.id,attrs:{cols:"12"}},[e("h3",[t._v(t._s(n.fields.Name))]),t._v(" "),e("nuxt-link",{attrs:{to:"/VideoList/"+n.fields.PlayListId+"?name="+n.fields.Name}},[t._v("\n            "+t._s(n.fields.PlayListId)+"\n          ")]),t._v(" "),e("span",[t._v("\n            "+t._s(n.fields.memo)+"\n          ")])],1)})),0)]),t._v(" "),e("div",{staticClass:"container__item"},[e("nuxt-link",{attrs:{to:"/youtubePlayList"}},[t._v("YoutubePlayList")])],1),t._v(" "),e("div",{staticClass:"pa-5"},[e("v-btn",{attrs:{block:"",outlined:"",color:"grey darken-3"},on:{click:t.signOut}},[t._v("\n        ログアウト\n      ")])],1)])])}),[],!1,null,null,null);n.default=component.exports;c()(component,{VApp:d.a,VBtn:v.a})}}]);