// EXPRESS (web server) - npm i express
// node .
// npm i -g nodemon
// nodemon .
// npm i ejs
// npm i socket.io

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const {readdirSync} = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const routeFiles = readdirSync('./routes').filter((file) => file.endsWith('.route.js'));
for (const routeFile of routeFiles) {
  const route = require(`./routes/${routeFile}`);
  // TODO: Disable tag
  app.use(route.route, route.router);
}

// Sockets (Server code)

io.on('connection', (socket) => {
  console.log('New socket connection');

  socket.on('message', (username, msg) => {
    console.log(`Received message: [${username}]: ${msg}`);
    io.emit('receivedMessage', username, msg);
  });

});

// -----------

server.listen(8000, () => {
  console.log('Server is alive at: http://localhost:8000');
});