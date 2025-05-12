// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendEmailVerification } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrgES3NN9uPi1TUu8BLex75Qhp1-8dZPY",
  authDomain: "fyp--ai-career-counselling.firebaseapp.com",
  databaseURL: "https://fyp--ai-career-counselling-default-rtdb.firebaseio.com",
  projectId: "fyp--ai-career-counselling",
  storageBucket: "fyp--ai-career-counselling.firebasestorage.app",
  messagingSenderId: "567776205783",
  appId: "1:567776205783:web:29e66900a173c76d7d4992",
  measurementId: "G-Z05V7PJF3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export const sendVerificationEmail = async (user) => {
  if (user && !user.emailVerified) {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent.");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }
};

export { db, auth };