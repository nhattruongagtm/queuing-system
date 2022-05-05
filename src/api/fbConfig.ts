// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7O1n1xUyrfFNl2GdWPX6aIkeCJr8I3FQ",
  authDomain: "queuing-system-2ec79.firebaseapp.com",
  projectId: "queuing-system-2ec79",
  storageBucket: "queuing-system-2ec79.appspot.com",
  messagingSenderId: "12439630201",
  appId: "1:12439630201:web:3cb470f40bd2d8fe4effa8",
  measurementId: "G-T6JV8TPMMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
