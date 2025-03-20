// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";  // Use the same version as firebase-app and firebase-auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOpspZW2fuQKcnKYNoyr9eVE3zo4koje4",
  authDomain: "gamesphere-1deae.firebaseapp.com",
  projectId: "gamesphere-1deae",
  storageBucket: "gamesphere-1deae.firebasestorage.app",
  messagingSenderId: "171917437802",
  appId: "1:171917437802:web:60ecb0ee69a8b10f675313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let user = auth.currentUser;
const db = getFirestore(app);

export { createUserWithEmailAndPassword, auth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, user, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getFirestore, collection, addDoc, app, db,getDocs };
