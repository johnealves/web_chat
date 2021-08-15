const moment = require('moment');
const { getAll, saveMessage } = require('../models/messages');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const messages = await getAll();
    socket.emit('load_messages', messages);
  
    socket.on('message', async ({ chatMessage, nickname: userNickname }) => {
      const date = moment().format('DD-MM-YYYY h:mm:ss a');
      io.emit('message', { userNickname, chatMessage});
      await saveMessage(chatMessage, nickname, date);
     });
  });
};