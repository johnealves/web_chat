const socket = window.io();
    
let nickname;
nickname = localStorage.getItem('nickname')
if (!nickname || null) {
  nickname = (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    )
    .slice(-16);
  localStorage.setItem('nickname', nickname);
}

// const ulUsers = document.getElementById('userList');
const user = document.getElementById('onlineUser');
user.innerText = ` Nickname: ${nickname}`;
socket.emit('new_user', nickname);

const sendButton = document.getElementById('sendMessage');
const sendNickname = document.getElementById('add-nickname');
const listMessages = document.querySelector('.message-list');

sendNickname.addEventListener('click', () => {
  const oldNickname = nickname;
  nickname = document.getElementById('text-nickname').value;
  socket.emit('update_nickname', { oldNickname, nickname });
  localStorage.setItem('nickname', nickname);
  const rename = document.getElementById('onlineUser');
  rename.innerText = `Nickname: ${nickname}`;  
});

sendButton.addEventListener('click', () => {
  if (nickname) {
    const chatMessage = document.getElementById('text-message').value;
    socket.emit('message', { chatMessage, nickname });
  } else {
    console.log('Error: "nickname is required"');
  }
});

socket.on('message', ({ nickname, chatMessage }) => {
  const item = document.createElement('li');
  item.innerHTML = `<span>${nickname}</span>: ${chatMessage}`;
  item.setAttribute('data-testid', 'message');
  listMessages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('onlineUsers', (onlineUsers) => {
  const userList = document.getElementById('userList');
  const users = document.querySelectorAll('.online-user');
  users.forEach((userOn) => (userOn.id !== 'onlineUser') && userList.removeChild(userOn));
  onlineUsers.forEach((userOn) => {
    if (userOn !== nickname) {
      const li = document.createElement('li');
      li.innerHTML = userOn;
      li.className = 'online-user';
      li.setAttribute('data-testid', 'online-user');
      userList.appendChild(li);
    }
  });
});
