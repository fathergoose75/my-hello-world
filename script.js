// Prevent automatic scroll to top on refresh
history.scrollRestoration = "manual";

// Save scroll position before the page unloads
window.addEventListener("beforeunload", () => {
  localStorage.setItem("scrollPosition", window.scrollY);
});

// Restore scroll position on page load
window.addEventListener("load", () => {
  const scrollPosition = localStorage.getItem("scrollPosition");
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
  }
});

// Define the toggleTheme function to handle theme switching
function toggleTheme() {
  const body = document.body;
  const container = document.querySelector(".container");
  const buttons = document.querySelectorAll("button");

  // Toggle theme classes on body and container
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");

  container.classList.toggle("dark-theme");
  container.classList.toggle("light-theme");

  // Toggle theme classes on all buttons
  buttons.forEach(button => {
    button.classList.toggle("dark-theme");
    button.classList.toggle("light-theme");
  });

  // Optional: Change button text to reflect the active theme
  themeToggleBtn.innerText = body.classList.contains("dark-theme")
    ? "Switch to Light Theme"
    : "Switch to Dark Theme";
}

// Event listener to play sound and toggle theme when "Toggle Theme" button is pressed
const themeToggleBtn = document.getElementById("theme-toggle-btn");
themeToggleBtn.addEventListener("click", () => {
  console.log("Toggle Theme button clicked");
  toggleSound.play().catch(error => console.error("Error playing toggle sound:", error));
  toggleTheme(); // Call the toggleTheme function here
});

function changeText() {
  const welcomeText = document.getElementById("welcome-text");
  const button = document.getElementById("change-text-btn");

  // Change text content
  welcomeText.innerText = "JavaScript is Dynamic and Fun!";

  // Add a pulsating animation
  welcomeText.classList.add("pulse-animation");

  // Change button color randomly
  button.style.backgroundColor = getRandomColor();
}

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createBackgroundCircles() {
  const container = document.getElementById("background-container");

  for (let i = 0; i < 20; i++) { // Number of circles
    const circle = document.createElement("div");
    circle.classList.add("background-circle");

    // Random position and size for each circle
    circle.style.left = `${Math.random() * 100}vw`;
    circle.style.top = `${Math.random() * 100}vh`;
    circle.style.width = `${Math.random() * 80 + 20}px`; // Random size between 20px and 100px
    circle.style.height = circle.style.width;

    // Random animation duration
    circle.style.animationDuration = `${Math.random() * 5 + 5}s`;

    container.appendChild(circle);
  }
}

// Ensure the function runs on page load
window.onload = createBackgroundCircles;

// Smooth scrolling when clicking on navbar links
document.querySelectorAll('#navbar a').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // Smoothly scroll to the section with an offset for the navbar
    window.scrollTo({
      top: targetSection.offsetTop - 70, // Offset for fixed navbar
      behavior: "smooth"
    });
  });
});

// Function to update active link based on scroll position
function updateActiveLink() {
  const sections = document.querySelectorAll("div.second-container > div");
  const navbarLinks = document.querySelectorAll("#navbar ul li a");

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80; // Offset for fixed navbar height
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // Update the active class for each link
  navbarLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === currentSectionId) {
      link.classList.add("active");
    }
  });
}

// Attach scroll event listener
window.addEventListener("scroll", updateActiveLink);

// Sound effects with error handling
const clickSound = document.getElementById("click-sound");
const toggleSound = document.getElementById("toggle-sound");

// Add error handling to audio elements
clickSound.onerror = () => console.error("Error loading click-sound.mp3");
toggleSound.onerror = () => console.error("Error loading toggle-sound.mp3");

// Check if audio files are loaded correctly
clickSound.oncanplaythrough = () => console.log("Click sound loaded successfully");
toggleSound.oncanplaythrough = () => console.log("Toggle sound loaded successfully");

// Play sound when "Click Me" button is pressed
document.getElementById("change-text-btn").addEventListener("click", () => {
  console.log("Change Text button clicked"); // Debugging log
  clickSound.play().catch(error => console.error("Error playing click sound:", error));
  changeText();
});
