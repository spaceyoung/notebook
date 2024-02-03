import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy } from 'firebase/firestore';

const notebookDB = initializeApp({
  apiKey: "AIzaSyBWNEluo62wozmcwgNUp3GS3ahtvBbj8Dg",
  authDomain: "notebook-56d13.firebaseapp.com",
  projectId: "notebook-56d13",
  storageBucket: "notebook-56d13.appspot.com",
  messagingSenderId: "235500647824",
  appId: "1:235500647824:web:c087ab481bbfc0cd816f15",
  measurementId: "G-J7GPRYGWV3"
});

export const database = getFirestore(notebookDB);
export const myReadingDB = query(collection(database, 'myReading'), orderBy('timeStamp'));
export const myReadingEndDB = query(collection(database, 'myReadingEnd'), orderBy('timeStamp'));