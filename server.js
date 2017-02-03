var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('src'));

var socket = require('socket.io');
var io = socket(server);

var currentUser;


io.on('connection', function(client) {
    var clientName = client.id
    console.log('a user connected: ' + clientName);
    client.on('disconnect', function() {
        console.log('user disconnected');
    });

    client.on('user name', function(user_name) {
    	 io.emit('user name', user_name);
    	     	var loggedInUser = user_name
    	     	currentUser = loggedInUser;
    });

    client.on('chat message', function(msg) {
        var msgObj = {
            "client": currentUser,
            "message": msg
        };
        io.emit('chat message', JSON.stringify(msgObj));
    });

});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/src/login.html');
});

app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});
