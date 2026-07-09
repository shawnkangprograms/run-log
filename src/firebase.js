// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrTT5tgGuRyWWTYVyYFrdHLC42xVhzbHQ",
  authDomain: "run-log-40cdd.firebaseapp.com",
  projectId: "run-log-40cdd",
  storageBucket: "run-log-40cdd.firebasestorage.app",
  messagingSenderId: "657398293403",
  appId: "1:657398293403:web:5489c54fd80b00e118773e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);