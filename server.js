var express = require('express');
var fs = require('fs');
var app = express();
var server = app.listen(8000, function(){
  console.log('listening on port 8000');
})

app.use(express.static("public"));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function(socket){
  console.log('connected: ' + socket.id);
})
