import {getFirestore, collection, addDoc,app ,db} from "./auth.js";



// Grab the form element
let form = document.querySelector('.contact-form form');

// Handle the form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from reloading the page

  // Get values from form inputs
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    // Add a new review to Firestore
    const docRef = await addDoc(collection(db, "reviews"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date() // Add timestamp of submission
    });

    // Alert user and clear form
    alert("Your message has been sent successfully!");
    form.reset(); // Reset form fields after submission

  } catch (e) {
    console.error("Error adding document: ", e);
    alert("There was an error submitting your review. Please try again.");
  }
});