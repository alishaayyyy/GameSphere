// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,
  createUserWithEmailAndPassword ,
  signInWithEmailAndPassword,
  signOut,
sendPasswordResetEmail,
GoogleAuthProvider,
signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1oMPNJtzi-mzgelwfAY5J-EF7GpeZ6d4",
  authDomain: "gamesphere-880c6.firebaseapp.com",
  projectId: "gamesphere-880c6",
  storageBucket: "gamesphere-880c6.firebasestorage.app",
  messagingSenderId: "589057341438",
  appId: "1:589057341438:web:bc744afb33a4e20c6472af"
};
//let user = auth.currentUser;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let user = auth.currentUser;

export{createUserWithEmailAndPassword,auth,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,user,GoogleAuthProvider,signInWithPopup}