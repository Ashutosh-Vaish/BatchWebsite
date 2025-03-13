const scriptURL = 'https://script.google.com/macros/s/AKfycbyVzgzb6cSYkB6D5W76LzTCgqeDMST8bzntetCk8Ouko6SSqePNm7mMyPjjD0CUhKcelQ/exec';
const form = document.forms['recruitment-form'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      alert("Thank you! Your request has been submitted.");
      form.reset(); // Clear the form
    })
    .catch(error => console.error('Error!', error.message));
});
