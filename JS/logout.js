import {signOut,auth } from "../JS/auth.js";

let logout = document.getElementById('logout');
logout.addEventListener('click',(e)=>{
e.preventDefault();
signOut(auth).then(()=>{
  window.location.href = "../HTML/index.html";
  console.log("success")
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert("error")
});
})