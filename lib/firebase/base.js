import * as firebase from "firebase";
import Rebase from "re-base";
// Required for side-effects
import "firebase/firestore";

// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFYPMhoK8gCYbdd9c2Je7w3R5x9_3AFSU",
  authDomain: "millsjameseventcms-testing.firebaseapp.com",
  databaseURL: "https://millsjameseventcms-testing.firebaseio.com",
  projectId: "millsjameseventcms-testing",
  storageBucket: "millsjameseventcms-testing.appspot.com",
  messagingSenderId: "874499192960",
  appId: "1:874499192960:web:4f44f10809c1b8d9c44e65",
  measurementId: "G-PJ2BTSFWJR",
};

export const fireBaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase;

const base = Rebase.createClass(fireBaseApp.database());

export default base;
