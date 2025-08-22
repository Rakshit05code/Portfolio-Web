// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlOHmSM5QGAcPnGUj8mUvns2_ESvkNe8w",
  authDomain: "contact-form-app-portfolio.firebaseapp.com",
  projectId: "contact-form-app-portfolio",
  storageBucket: "contact-form-app-portfolio.appspot.com",
  messagingSenderId: "1062318295281",
  appId: "1:1062318295281:web:9776b079ecd6d51d27c150",
  measurementId: "G-7J8ZRTS2TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };