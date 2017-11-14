var fs = require('fs');

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

//HAVE TO USE BODY PARSER TO MAKE A POST REQUEST
var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extented: true}));

//Handeling socket connections
io.sockets.on('connection', function(socket){
  console.log('connected: ' + socket.id);
  socket.on('sampleData', function(data){
    socket.broadcast.emit('sampleData', data);
  });
})

//Add new user to a file
app.post('/newUser', function(req, res) {
  console.log("inside post request");
  console.log(req.body);
  res.send("Name that you sent me is: " + req.body.data);
})
