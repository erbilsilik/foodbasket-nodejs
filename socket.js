'use strict';

const express = require('express');
const Redis = require('ioredis');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//App
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});


app.get('/', (req, res) => {
  res.sendFile('public/index.html', {
    root: __dirname
  });
});

const redis = new Redis({
  host: 'redis'
});

redis.psubscribe('*', function (err, count) {});

redis.on('pmessage', function (subscribed, channel, message) {
  console.log(channel);
  message = JSON.parse(message);
  io.emit(channel, channel);
});

http.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);