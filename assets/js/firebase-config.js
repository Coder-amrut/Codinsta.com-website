// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb55Qjf5c8PPJyXTs6hHwl2R12Ah0MAck",
  authDomain: "codinsta-6f27d.firebaseapp.com",
  databaseURL: "https://codinsta-6f27d-default-rtdb.firebaseio.com",
  projectId: "codinsta-6f27d",
  storageBucket: "codinsta-6f27d.firebasestorage.app",
  messagingSenderId: "791631594202",
  appId: "1:791631594202:web:d0351251c306c361ae5be3",
  measurementId: "G-V9LKX8CKK1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

window.firebaseDB = db;
window.firebaseAuth = auth;
window.firebaseApp = app;