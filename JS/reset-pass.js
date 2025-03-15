import { sendPasswordResetEmail,auth } from "../JS/auth.js";

let reset = document.getElementById('reset');
reset.addEventListener('click',(e)=>{
  e.preventDefault();

  let email = document.getElementById('email').value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert('successfull')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });

})