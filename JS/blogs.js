import { onAuthStateChanged,db,auth,collection,addDoc,getDocs } from "./auth.js";

const addBlogButton = document.getElementById('add');

addBlogButton.addEventListener('click', () => {
  checkUserAuthentication();
});

function checkUserAuthentication() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If user is authenticated, redirect to blogs.html
      // alert("working")
      window.location.href= "../HTML/add.html";
    } else {
      // If user is not authenticated, show an alert
      alert("Please log in first.");
    }
  });
}

// blogs fetching

// import { db, collection, getDocs } from "./auth.js"; // Assuming you are using Firebase Firestore

// Function to fetch blog data from Firestore
const fetchBlogs = async () => {
  try {
    const blogsCollection = collection(db, "blogs");
    const blogSnapshot = await getDocs(blogsCollection);
    const blogs = blogSnapshot.docs.map((doc) => doc.data()); // Extract blog data from Firestore

    displayBlogs(blogs); // Call function to display the blogs on the page
  } catch (error) {
    console.error("Error fetching blogs: ", error);
  }
};

// Function to dynamically create blog cards and display them
const displayBlogs = (blogs) => {
  const blogContainer = document.getElementById("blog-cards-container");

  blogs.forEach(blog => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    // Create the HTML structure for the blog card
    blogCard.innerHTML = `
      <img class="image" src="${blog.imageUrl || 'default-image.jpg'}" alt="Blog Image" class="img-fluid rounded">
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
    `;

    // Append the card to the blog container
    blogContainer.appendChild(blogCard);
  });
};

// Call fetchBlogs when the page loads to display the blogs
window.onload = fetchBlogs;
