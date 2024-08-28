// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export {auth}