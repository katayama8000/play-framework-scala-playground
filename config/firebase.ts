// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBndJ_1rInHadV3hF1wxtSq5-YYBrwnNBk",
  authDomain: "todo-for-me.firebaseapp.com",
  projectId: "todo-for-me",
  storageBucket: "todo-for-me.appspot.com",
  messagingSenderId: "657206764720",
  appId: "1:657206764720:web:926e47badfa626969dc775",
  measurementId: "G-38PKH3KWSE",
};

// apiKey: process.env.NEXT_PUBLIC_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
// projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
// storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
// messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
// appId: process.env.NEXT_PUBLIC_APP_ID,

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);
