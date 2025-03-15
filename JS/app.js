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


// rating

// rating.js
let selectedRating = 0;

// Get the star elements
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
  // Hover effect to highlight stars
  star.addEventListener('mouseover', () => {
    highlightStars(star.getAttribute('data-value'));
  });

  // Reset color when mouse leaves
  star.addEventListener('mouseout', () => {
    resetStars();
    if (selectedRating > 0) {
      highlightStars(selectedRating);
    }
  });

  // Handle click event to select rating
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    highlightStars(selectedRating);
  });
});

// Highlight stars based on rating value
function highlightStars(ratingValue) {
  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= ratingValue) {
      star.style.color = "#ff641d"; // Orange
    } else {
      star.style.color = "white"; // Reset to white
    }
  });
}

// Reset stars to default color
function resetStars() {
  stars.forEach(star => {
    star.style.color = "white";
  });
}

// Handle submit rating
document.getElementById('submit-rating').addEventListener('click', async () => {
  if (selectedRating === 0) {
    alert("Please select a rating.");
    return;
  }

  // Save rating to Firestore
  await saveRatingToFirestore(selectedRating);

  // Display thank you message
  document.getElementById('rating-message').textContent = "Thank you for your rating!";

  // Optionally, reset stars after submission
  resetStars();
  selectedRating = 0;
});

// Save rating to Firestore
async function saveRatingToFirestore(rating) {
  try {
    await db.collection('ratings').add({
      rating: rating,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Rating saved successfully!');
  } catch (error) {
    console.error('Error saving rating: ', error);
  }
}

// Load and display average rating (optional)
async function loadAverageRating() {
  const snapshot = await db.collection('ratings').get();
  let totalRating = 0;
  let totalRatings = snapshot.size;

  snapshot.forEach(doc => {
    totalRating += doc.data().rating;
  });

  const averageRating = totalRatings > 0 ? (totalRating / totalRatings).toFixed(1) : 0;
  displayAverageRating(averageRating);
}

// Display the average rating as stars
function displayAverageRating(averageRating) {
  const averageStarsElement = document.getElementById('rating-message');
  let starsHtml = '';

  for (let i = 0; i < 5; i++) {
    if (i < averageRating) {
      starsHtml += '&#9733;'; // Filled star
    } else {
      starsHtml += '&#9734;'; // Empty star
    }
  }

  averageStarsElement.innerHTML = `<strong>Average Rating:</strong> ${starsHtml} (${averageRating} stars)`;
}

// Load the average rating on page load
loadAverageRating();
