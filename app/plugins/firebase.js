import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBy2YwdqUjB1N07cDJsQV0DtxYjsUSXc-Q",
    authDomain: "movie-memo-a810f.firebaseapp.com",
    databaseURL: "https://movie-memo-a810f.firebaseio.com",
    projectId: "movie-memo-a810f",
    storageBucket: "movie-memo-a810f.appspot.com",
    messagingSenderId: "357306995010",
    appId: "1:357306995010:web:dc39b2d329213ebbd738db",
    measurementId: "G-XVBT8FDZEP"
  });
}

export default firebase;
