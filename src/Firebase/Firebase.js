// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0KGfaOxma0G8tbmB_PEydfbvC7g5eOr0",
  authDomain: "veridox-68b89.firebaseapp.com",
  projectId: "veridox-68b89",
  storageBucket: "veridox-68b89.appspot.com",
  messagingSenderId: "217484249170",
  appId: "1:217484249170:web:6f9bc01eb7d96eb436778b",
  measurementId: "G-SCBVE1JRCV",
  databaseURL: "https://veridox-68b89-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore();
export const realtimeDB = getDatabase(app);
export const storage = getStorage();
export const authentication = getAuth(app);