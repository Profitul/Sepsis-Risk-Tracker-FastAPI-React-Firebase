import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "sepsis-1440p.firebaseapp.com",
  projectId: "sepsis-1440p",
  storageBucket: "sepsis-1440p.appspot.com", // 🔧 corectat domeniul (era greșit)
  messagingSenderId: "940587546450",
  appId: "1:940587546450:web:38d6c184ac40817fe1ec8b",
  measurementId: "G-VCEMZGH1ZD"
};

// inițializare aplicație
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// exporturi finale
export { db, auth, signInWithEmailAndPassword };
