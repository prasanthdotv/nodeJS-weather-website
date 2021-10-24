const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msgOne = document.getElementById('msg-one');
const msgTwo = document.getElementById('msg-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`http://localhost:3000/weather?location=${input.value}`).then((response) => {
    msgOne.innerText = 'Loading...';
    msgTwo.innerText = '';
    response.json().then((data) => {
      if (data.error) {
        msgOne.innerText = data.error;
        return;
      }
      msgOne.innerText = data.title;
      msgTwo.innerText = data.message;
      input.value = '';
    });
  });
});
