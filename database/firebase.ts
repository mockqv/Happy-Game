import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBl7YmNcoyiGnpRQWYzeQU0lYFQdOtQuoc",
  authDomain: "happy-game-af78a.firebaseapp.com",
  projectId: "happy-game-af78a",
  storageBucket: "happy-game-af78a.firebasestorage.app",
  messagingSenderId: "788000588993",
  appId: "1:788000588993:web:9feb5fe7ffada356b80040",
  measurementId: "G-M6WBTPWDR0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);