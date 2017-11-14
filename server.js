//Web Server
var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 8000, function(){
  console.log('serverstarted');
})
app.use(express.static("public"));

//Socket stuff
var socket = require('socket.io');
var io = socket(server);

//Handeling socket connections
io.sockets.on('connection', function(socket){
  console.log('connected: ' + socket.id);
  socket.on('questionData', function(data){
    console.log("got question data");
    socket.broadcast.emit('questionData', data);
  });
})


//HAVE TO USE BODY PARSER TO MAKE A POST REQUEST
// var bodyparser = require("body-parser");
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extented: true}));
