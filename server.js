var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('src'));

var socket = require('socket.io');
var io = socket(server);


io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });



});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});
