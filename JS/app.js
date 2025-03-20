
import {signOut,auth,onAuthStateChanged ,getFirestore, collection, getDocs,app,db } from "../JS/auth.js";


const toggler = document.querySelector('#toggle');
const navbar = document.querySelector('.navbar');
const bulb = document.querySelector('.bulb');

// Event listener for the theme toggle
toggler.addEventListener('change', () => {
    if (toggler.checked) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        navbar.classList.add('navbar-dark');
        navbar.classList.remove('navbar-light');
        bulb.style.color = 'black'; // Change bulb color to dark
        localStorage.setItem('theme', 'dark-theme'); // Save the theme in localStorage
    } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        navbar.classList.add('navbar-light');
        navbar.classList.remove('navbar-dark');
        bulb.style.color = 'yellow'; // Change bulb color to yellow
        localStorage.setItem('theme', 'light-theme'); // Save the theme in localStorage
    }
});

// Set the default theme based on localStorage or default to light theme
if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    document.body.classList.add(theme);
    if (theme === 'dark-theme') {
        toggler.checked = true;
        navbar.classList.add('navbar-dark');
        navbar.classList.remove('navbar-light');
        bulb.style.color = 'black';
    }
} else {
    document.body.classList.add("light-theme");
}




// logout

// signout
let logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  const user = auth.currentUser; // Get the current user
  
  if (user) {
    // If user is logged in, sign them out
    signOut(auth)
      .then(() => {
        alert('You have successfully logged out.');
        window.location.href = "./index.html"; // Redirect to the homepage
      })
      .catch((error) => {
        alert('Error during logout.');
      });
  } else {
    // If no user is logged in, show an alert saying the user is already logged out
    alert('User is already logged out.');
  }
});

// document.getElementById("login").onclick = function () {
//   const user = auth.currentUser; // Get the current user

//   if (user) {
//       // User is logged in, redirect to profile.html
//       alert("User is already logged in...")
//       // window.location.href = '../index.html';
//   } else{
//       // User is not logged in, redirect to login.html
//       alert("watching")
//       window.location.href = '../HTML/login.html';
//   }
// };

// reviews
async function getData () {
  try {
    const Reading = await getDocs(collection(db, "reviews"));
    let html = "";  // This will store the HTML content to display

    Reading.forEach((doc) => {
      const data = doc.data();
      console.log(data);  // Log the data to the console to inspect it

      // Add the document's data and the buttons to HTML
      html += `
        <p>
          Name: ${data.name} <br>
          Comment: ${data.message} <br>
        </p>
        <hr>
      `;
    });

    // Add the generated HTML to the element with id 'main'
    document.getElementById("main").innerHTML = html;
  } catch (error) {
    // alert(error);
  }
}

// Call the getData function to display the documents
getData();
