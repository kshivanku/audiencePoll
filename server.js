var express = require('express');
var fs = require('fs');
var app = express();
var server = app.listen(process.env.PORT || 8000, function(){
  console.log('serverstarted');
})

app.use(express.static("public"));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function(socket){
  console.log('connected: ' + socket.id);
  socket.on('sampleData', function(data){
    socket.broadcast.emit('sampleData', data);
  });
})
