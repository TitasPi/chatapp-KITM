const socket = io();

const username = document.getElementById('username');
const chatbox = document.getElementById('chatbox');
const input = document.getElementById('input');
const button = document.getElementById('sendButton');

// Client code
function sendMessage(username, msg) {
  socket.emit('message', username, msg);
};

// Listening on 'receivedMessage' event, and printing message
socket.on('receivedMessage', (username, msg) => {
  console.log(`[${username}]: ${msg}`);
  const div = document.createElement('div');
  const usernameElement = document.createElement('span');
  const messageElement = document.createElement('span');

  usernameElement.innerText = username;
  messageElement.innerText = msg;

  usernameElement.classList.add('badge', 'bg-secondary');

  div.appendChild(usernameElement);
  div.appendChild(messageElement);

  chatbox.appendChild(div);

});

button.onclick = (e) => {
  sendMessage(username.value, input.value);
  input.value = '';
};