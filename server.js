//Web Server
var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 8000, function() {
    console.log('serverstarted');
})
app.use(express.static("public"));

//Socket stuff
var socket = require('socket.io');
var io = socket(server);

//Handeling socket connections
io.sockets.on('connection', function(socket) {
    console.log('connected: ' + socket.id);
    socket.on('newUserJoined', function(data) {
        console.log("new user joined");
        io.sockets.emit('adminChatMessage', data);
    });
    socket.on('questionData', function(data) {
        console.log("got question data");
        socket.broadcast.emit('questionData', data);
    });
    socket.on('userChatMessage', function(data) {
        console.log("got user chat content");
        //send the answer content to all connections including the sending client
        io.sockets.emit('userChatMessage', data);
    });
    socket.on('audienceReaction', function(data) {
        console.log("got reaction data from admin");
        socket.broadcast.emit('adminChatMessage', data);
    });
})

//HAVE TO USE BODY PARSER TO MAKE A POST REQUEST
// var bodyparser = require("body-parser");
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extented: true}));
