// rateLimit.js

// Cooldown in milliseconds
const clickCooldown = 5000; // 5 seconds

// Store the last click times per button
const lastClicks = new Map();

// Rate limit button clicks
function handleClick(e) {
  const button = e.currentTarget;
  const now = Date.now();
  const last = lastClicks.get(button) || 0;

  if (now - last < clickCooldown) {
    alert("Please wait a few seconds before clicking again.");
    e.preventDefault(); // stop the click
  } else {
    lastClicks.set(button, now);
  }
}

// Detect rapid reloads using localStorage (basic)
(function detectSpamReloads() {
  const lastLoad = localStorage.getItem("lastPageLoad");
  const now = Date.now();

  if (lastLoad && now - parseInt(lastLoad) < 3000) {
    alert("You're reloading too fast. Please slow down.");
  }

  localStorage.setItem("lastPageLoad", now.toString());
})();

// Attach click listeners on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener("click", handleClick);
  });
});
