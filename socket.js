var server = require("http").createServer();

var io = require("socket.io")(server);

var Redis = require("ioredis");
var redis = new Redis({
  host: 'redis'
});

redis.subscribe("test-channel");

redis.on("message", function (channel, message) {
  console.log(channel, message);
  // message = JSON.parse(message);

  // io.emit(channel + ':' + message.event, message.data);
});

server.listen(4000);