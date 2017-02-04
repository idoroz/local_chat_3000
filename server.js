var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('src'));

var socket_io = require('socket.io');
var io = socket_io(server);

var currentUser;

var usersLoggedIn = [];

io.on('connection', function(client) {
    var clientName = client.id
    console.log('a user connected: ' + clientName);
    client.on('disconnect', function() {
    	io.emit('log out', client.id);
        console.log('user disconnected');
    });

client.on('userList', function(list) {
	console.log(list);
	io.emit('userList', usersLoggedIn);
})
    client.on('send_nick', function(send_nick) {
    	 io.emit('send_nick', send_nick);
    	     	var loggedInUser = send_nick
    	     	currentUser = loggedInUser;
    	     	client.id = currentUser;
    	     	console.log(client.id);
usersLoggedIn.push(client.id);
  console.log(usersLoggedIn);
    });



    client.on('chat message', function(msg) {
    	console.log(currentUser);
        var msgObj = {
            "client": client.id,
            "message": msg
        };
        io.emit('chat message', JSON.stringify(msgObj));

    });

});

// app.get('/login', function(req, res) {
//     res.sendFile(__dirname + '/src/login.html');
// });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
    res.send(usersLoggedIn);

});
