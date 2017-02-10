var express = require('express');
var app = express();

var server = app.listen(3000, '10.0.0.6');
app.use(express.static('src'));

var socket_io = require('socket.io');
var io = socket_io(server);

var currentUser;
var loggedInUser;
var userID;
var userName;
     var userObj;
var usersLoggedIn = [];

io.on('connection', function(client) {
    var clientName = client.id
    console.log('a user connected: ' + clientName);

    client.on('send_nick', function(send_nick) {
        io.emit('send_nick', send_nick);
        var loggedInUser = send_nick
        var userID = client.id;
        client.userloggedIn = loggedInUser;
        userName = loggedInUser
        console.log(client.id);
   userObj = {

            user_name: userName,
            user_id: userID

        }
        usersLoggedIn.push(userObj);
        console.log(usersLoggedIn);
    });

    client.on('userList', function(list) {
        io.emit('userList', usersLoggedIn);
    })


    client.on('chat message', function(msg) {
    
        var msgObj = {
            "client": client.id,
            "message": msg
        };
            console.log(JSON.stringify(msgObj));
        io.emit('chat message', msgObj);

    });


        client.on('disconnect', function() {
        io.emit('log out', client.id);
        for (var x = 0; x < usersLoggedIn.length; x++) {

            if (usersLoggedIn[x].user_id == clientName) {
                usersLoggedIn.splice(x, 1);
                console.log(usersLoggedIn);
                io.emit('userList', usersLoggedIn);
                
            }
        }
    });

});

// app.get('/login', function(req, res) {
//     res.sendFile(__dirname + '/src/login.html');
// });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
   // res.send(usersLoggedIn);

});
