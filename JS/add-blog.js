import { db, auth, collection, addDoc } from "./auth.js";

// Select form and fields
const blogForm = document.getElementById("blog-form");
const blogTitle = document.getElementById("blog-title");
const blogContent = document.getElementById("blog-content");
const blogImage = document.getElementById("blog-image");

// Cloudinary Upload Function
const uploadImg = async () => {
  const file = document.getElementById("blog-image");
  const selectedImg = file.files[0];

  const cloudName = "duo0iqvpr"; // Your Cloudinary cloud name
  const presetName = "firebaseXcloudinary"; // Your Cloudinary upload preset

  // FormData to send the image to Cloudinary
  const formData = new FormData();
  formData.append("file", selectedImg);
  formData.append("upload_preset", presetName);
  formData.append("cloud_name", cloudName);

  try {
    // Make a POST request to Cloudinary's API to upload the image
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData, // Send the image as form data
    });

    // Parse the response from Cloudinary
    const data = await response.json();
    console.log("Cloudinary upload success", data);
    return data.secure_url; // Return the secure image URL from Cloudinary
  } catch (error) {
    console.log("Error uploading to Cloudinary", error);
    return null; // Return null if the upload fails
  }
};

// Listen for form submission
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const title = blogTitle.value.trim(); // Get the blog title
  const content = blogContent.value.trim(); // Get the blog content
  const imageFile = blogImage.files[0]; // Get the image file if any

  // Check if both the title and content are provided
  if (!title || !content) {
    alert("Please fill in both the title and content of the blog.");
    return;
  }

  try {
    // Check if the user is authenticated
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to add a blog.");
      return;
    }

    let imageUrl = null;
    // If an image is selected, upload it to Cloudinary and get the image URL
    if (imageFile) {
      imageUrl = await uploadImg(); // Get the image URL from Cloudinary
      if (!imageUrl) {
        alert("Image upload failed, please try again.");
        return;
      }
    }

    // Prepare the blog data to be saved in Firestore
    const blogData = {
      title: title,
      content: content,
      author: user.email,
      timestamp: new Date(),
      imageUrl: imageUrl, // Add image URL if available
    };

    // Save the blog post to Firestore
    const docRef = await addDoc(collection(db, "blogs"), blogData);
    alert("Your blog has been added successfully!");

    // Clear the form
    blogForm.reset();
  } catch (error) {
    console.error("Error adding blog: ", error);
    alert("There was an error submitting your blog. Please try again.");
  }
});

