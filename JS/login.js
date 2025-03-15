import {signInWithEmailAndPassword,auth } from "../JS/auth.js";

let form = document.getElementById('form');
form.addEventListener('submit', (e)=>{
e.preventDefault();
let email = document.getElementById('email').value ;
let password = document.getElementById('password').value ;




signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("yes")
    // window.location.href = "../HTML/dashboard.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("error")
  });

})