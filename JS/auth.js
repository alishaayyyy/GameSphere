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
  apiKey: "AIzaSyDOpspZW2fuQKcnKYNoyr9eVE3zo4koje4",
  authDomain: "gamesphere-1deae.firebaseapp.com",
  projectId: "gamesphere-1deae",
  storageBucket: "gamesphere-1deae.firebasestorage.app",
  messagingSenderId: "171917437802",
  appId: "1:171917437802:web:60ecb0ee69a8b10f675313"
};
//let user = auth.currentUser;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let user = auth.currentUser;

export{createUserWithEmailAndPassword,auth,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,user,GoogleAuthProvider,signInWithPopup}