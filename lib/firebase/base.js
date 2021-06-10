import * as firebase from 'firebase';
import Rebase from 're-base';
// Required for side-effects
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'millsjameseventcms-testing.firebaseapp.com',
  databaseURL: 'https://millsjameseventcms-testing.firebaseio.com',
  projectId: 'millsjameseventcms-testing',
  storageBucket: 'millsjameseventcms-testing.appspot.com',
  messagingSenderId: '874499192960',
  appId: '1:874499192960:web:0e5f378c98043519c44e65',
  measurementId: 'G-YMZJGQ3KD0',
};

export const fireBaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase;

const base = Rebase.createClass(fireBaseApp.database());

export default base;
