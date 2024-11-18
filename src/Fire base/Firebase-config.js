import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIyV3rlzEFCXpvaqJAq40hICryGRwjets",
  authDomain: "school-webpage-form.firebaseapp.com",
  projectId: "school-webpage-form",
  storageBucket: "school-webpage-form.firebasestorage.app",
  messagingSenderId: "859542011683",
  appId: "1:859542011683:web:e49be89fc6c88a74b3d696",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export default app;
