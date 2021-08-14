// Faça seu código aqui
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
const socketServer = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(socketServer);
const controllers = require('./controllers');

app.use(cors());

require('./socket/chat')(io);
require('./socket/socketMessages')(io);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', controllers.loadPage);

const { PORT = 3000 } = process.env;

socketServer.listen(PORT, () => console.log(`listen on port ${PORT}`));