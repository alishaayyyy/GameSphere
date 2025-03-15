import { createUserWithEmailAndPassword,auth } from "../JS/auth.js";

let form = document.getElementById('form');
form.addEventListener('submit', (e)=>{
e.preventDefault();
let email = document.getElementById('email').value ;
let password = document.getElementById('password').value ;



createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Successfull")
    // window.location.href = "../HTML/login.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });

})