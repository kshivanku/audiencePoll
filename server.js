var express = require('express');
var fs = require('fs');
var app = express();
var server = app.listen(process.env.PORT || 8000, function(){
  console.log('serverstarted');
})

app.use(express.static("public"));

// app.get('/login', function(req, res){
//   res.send("login");
// });
//
// app.get('/admin', function(req, res){
//   res.send("admin");
// });

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function(socket){
  console.log('connected: ' + socket.id);
})
