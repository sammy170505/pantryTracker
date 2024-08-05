// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLJwXCQL0c4-hDqikkmGseMEBZCTiDfCU",
  authDomain: "pantrytracker-36309.firebaseapp.com",
  projectId: "pantrytracker-36309",
  storageBucket: "pantrytracker-36309.appspot.com",
  messagingSenderId: "211427656961",
  appId: "1:211427656961:web:26364ac74175fc68298700",
  measurementId: "G-H69RR0MEJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};