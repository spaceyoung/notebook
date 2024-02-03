import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy } from 'firebase/firestore';

const notebookDB = initializeApp({
  apiKey: import.meta.env.VITE_FB_APP_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
});

export const database = getFirestore(notebookDB);
export const myReadingDB = query(collection(database, 'myReading'), orderBy('timeStamp'));
export const myReadingEndDB = query(collection(database, 'myReadingEnd'), orderBy('timeStamp'));