// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBndJ_1rInHadV3hF1wxtSq5-YYBrwnNBk",
  authDomain: "todo-for-me.firebaseapp.com",
  projectId: "todo-for-me",
  storageBucket: "todo-for-me.appspot.com",
  messagingSenderId: "657206764720",
  appId: "1:657206764720:web:926e47badfa626969dc775",
  measurementId: "G-38PKH3KWSE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
