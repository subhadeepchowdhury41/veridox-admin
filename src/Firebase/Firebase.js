// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0KGfaOxma0G8tbmB_PEydfbvC7g5eOr0",
  authDomain: "veridox-68b89.firebaseapp.com",
  projectId: "veridox-68b89",
  storageBucket: "veridox-68b89.appspot.com",
  messagingSenderId: "217484249170",
  appId: "1:217484249170:web:6f9bc01eb7d96eb436778b",
  measurementId: "G-SCBVE1JRCV"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const authentication = getAuth(app);
export const authProvider = new GoogleAuthProvider();
