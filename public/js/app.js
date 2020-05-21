// Assign variables to DOM elements, so we can use them
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = '...from javasxript';

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value.trim();
  weatherForm.reset();

  messageOne.textContent = '... loading ...';
  messageTwo.textContent = '';

  // Call js built-in fetch function
  fetch(`/weather?address=${location}`).then(res => {
    res.json().then(({ error, location, forecast } = {}) => {
      if (error) {
        return (messageOne.textContent = `Error: ${error}`);
      }
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
  });
});
