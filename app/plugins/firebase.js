import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID
    // databaseURL: "https://movie-memo-a810f.firebaseio.com",
    // storageBucket: "movie-memo-a810f.appspot.com",
    // messagingSenderId: "357306995010",
    // measurementId: "G-XVBT8FDZEP"
  });
}

export const auth = firebase.auth;
export default firebase;
