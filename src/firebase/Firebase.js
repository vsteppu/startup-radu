// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoMG4mnLfURURkDsW1Aenop4SSNqEBaOA",
  authDomain: "search-for-jobs-385a0.firebaseapp.com",
  projectId: "search-for-jobs-385a0",
  storageBucket: "search-for-jobs-385a0.appspot.com",
  messagingSenderId: "985897816370",
  appId: "1:985897816370:web:30a941a29f0612187b072b",
  measurementId: "G-9RSD1STCZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
