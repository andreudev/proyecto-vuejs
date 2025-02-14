// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_PlBbzRLZoOK7bWDG00wF8K1AQ_6Usuw",
  authDomain: "vuejs-7fddb.firebaseapp.com",
  projectId: "vuejs-7fddb",
  storageBucket: "vuejs-7fddb.firebasestorage.app",
  messagingSenderId: "264223472815",
  appId: "1:264223472815:web:c857bfe57ec67c0529e85a",
  measurementId: "G-HR9PBMPTCR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
