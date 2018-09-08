'use strict';

const express = require('express');
const Redis = require('ioredis');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//App
const app = express();
app.get('/', (req, res) => {
  res.send('kwadk');
});

const redis = new Redis({
  host: 'redis'
});

redis.on('message', (channel, message) => {
  console.log(`Received the following message from ${channel}: ${message}`);
});

const channel = 'test-channel';

redis.subscribe(channel, (error, count) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);