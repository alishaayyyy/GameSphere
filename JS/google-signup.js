import { auth, signInWithPopup, GoogleAuthProvider } from "../JS/auth.js";

auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

// Add prompt parameter to force account selection
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
  'prompt': 'select_account'
});

let google = document.getElementById('Google');

google.addEventListener('click', (e) => {
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // window.location.href = "../HTML/dashboard.html";
      alert("success")
      updateUserProfile(user); // Call updateUserProfile function here
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

// function updateUserProfile(user) {
//   const UserName = user.displayName;
//   const UserEmail = user.email;
//   const UserProfilePicture = user.photoURL; // Fix: photoUrl -> photoURL
//   document.getElementById('UserName').textContent = UserName;
//   document.getElementById('UserEmail').textContent = UserEmail;
//   document.getElementById('UserProfilePicture').src = UserProfilePicture; // Fix: textContent -> src
// }
// updateUserProfile()