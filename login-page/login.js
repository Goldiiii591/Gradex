// Get the sign in button
const form = document.querySelector('form');
// When user submits the form
form.addEventListener('submit', function(e) {
  // Stop page from refreshing
  e.preventDefault();
  // Get what user typed
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Check fields are not empty
  if (!email || !password) {
    alert('Please fill in all fields!');
    return;
  }
  // Go to dashboard page
  window.location.href = '../dashboard/dashboard.html';

});