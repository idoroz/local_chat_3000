var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('src'));

var socket_io = require('socket.io');
var io = socket_io(server);

var currentUser;


io.on('connection', function(client) {
    var clientName = client.id
    console.log('a user connected: ' + clientName);
    client.on('disconnect', function() {
        console.log('user disconnected');
    });

    client.on('send_nick', function(send_nick) {
    	 io.emit('send_nick', send_nick);
    	     	var loggedInUser = send_nick
    	     	currentUser = loggedInUser;
    	     	console.log(currentUser);

    });

        client.on('log in', function(nickname) {
        	if(nickname == 'undefined') {
        		currentUser = '';
        	}
        	 	var nickname = currentUser;
    	 io.emit('log in', nickname);
    	     	console.log("nickname is : " +currentUser);

    });

    client.on('chat message', function(msg) {
    	console.log(currentUser);
        var msgObj = {
            "client": currentUser,
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

});
