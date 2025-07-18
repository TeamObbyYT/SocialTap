const clickCooldown = 5000; // 5 seconds
const reloadThreshold = 10000; // 10 seconds for reload spam
const lastClicks = new Map();

// Redirect URL if spam is detected
const rateLimitRedirectURL = "rate_limit";

// Detect rapid page reloads
(function detectRapidReload() {
  const now = Date.now();
  const lastLoad = parseInt(localStorage.getItem("lastPageLoad") || "0");

  if (now - lastLoad < reloadThreshold) {
    window.location.href = rateLimitRedirectURL;
  }

  localStorage.setItem("lastPageLoad", now.toString());
})();

// Detect spammy button clicks
function handleRateLimitedClick(e) {
  const button = e.currentTarget;
  const now = Date.now();
  const last = lastClicks.get(button) || 0;

  if (now - last < clickCooldown) {
    e.preventDefault(); // Block the link
    window.location.href = rateLimitRedirectURL;
  } else {
    lastClicks.set(button, now);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", handleRateLimitedClick);
  });
});
