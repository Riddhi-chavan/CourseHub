// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP3IJkPfOUSu7zaLtopoDmXiqgbZ3HA4s",
  authDomain: "studentcourse-cf482.firebaseapp.com",
  databaseURL: "https://studentcourse-cf482-default-rtdb.firebaseio.com",
  projectId: "studentcourse-cf482",
  storageBucket: "studentcourse-cf482.appspot.com",
  messagingSenderId: "504332535235",
  appId: "1:504332535235:web:f3ee2381875b5c4e636976",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const database = getDatabase(app);
