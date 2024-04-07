import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABOAgIjVC1u8rV1JStsryHueI2-D4LHtY",
  authDomain: "info6129w24-1185982.firebaseapp.com",
  projectId: "info6129w24-1185982",
  storageBucket: "info6129w24-1185982.appspot.com",
  messagingSenderId: "690379632182",
  appId: "1:690379632182:web:79f14aa0f05e44152c7297",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
