import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5gR9MkO5HjFMmWBbzqAOF2l9uOyvAPHQ",
  authDomain: "myntra-617c2.firebaseapp.com",
  projectId: "myntra-617c2",
  storageBucket: "myntra-617c2.appspot.com",
  messagingSenderId: "72937235715",
  appId: "1:72937235715:web:adea74e61d9b3513db7536",
  measurementId: "G-MEQBS70X07",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }