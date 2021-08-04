import app from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from '../../firebase-creds';
import Rebase from 're-base';
// Required for side-effects
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase

export const fireBaseApp = !app.apps.length
  ? app.initializeApp(firebaseConfig)
  : app;

export const realtime_database = app.database();

const base = Rebase.createClass(realtime_database);

export default base;
