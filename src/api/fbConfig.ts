// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7O1n1xUyrfFNl2GdWPX6aIkeCJr8I3FQ",
//   authDomain: "queuing-system-2ec79.firebaseapp.com",
//   projectId: "queuing-system-2ec79",
//   storageBucket: "queuing-system-2ec79.appspot.com",
//   messagingSenderId: "12439630201",
//   appId: "1:12439630201:web:3cb470f40bd2d8fe4effa8",
//   measurementId: "G-T6JV8TPMMJ",
// };


const firebaseConfig = {
  apiKey: "AIzaSyAile6Mmymas9iYzY-joTV-kRRFBvG-swY",
  authDomain: "bk1sf-9b4a8.firebaseapp.com",
  projectId: "bk1sf-9b4a8",
  storageBucket: "bk1sf-9b4a8.appspot.com",
  messagingSenderId: "147855566857",
  appId: "1:147855566857:web:91a7d8e0ff312ea975b0d8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
