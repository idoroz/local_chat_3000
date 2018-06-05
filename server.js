var express = require('express');
var app = express();

var server = app.listen(3000, '128.0.0.108');
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
        userData = loggedInUser
        console.log(client.id);
        userObj = {

            user_data: userData,
            user_id: userID,


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


    client.on('typing', function(data) {
        console.log(data);
        io.emit('typing', client.id);
    });

    client.on('stopTyping', function(data) {
        console.log(data);
        io.emit('stopTyping', client.id);
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

    client.on('pm', function(msg) {


        var n = msg.includes("pm");
        if (n == true) {
            console.log('Got it!');

            var str = msg;
            // var str = 'one:two;three';     
            var getReciever = str.split(':').pop().split(';').shift(); // returns 'two'
            console.log(getReciever);

            var getPM = msg.split(";");
            var result = getPM.pop();

            for (var i = 0; i < usersLoggedIn.length; i++) {

                if (usersLoggedIn[i].user_data.u_name == getReciever) {
                    console.log('here is the match : ' + usersLoggedIn[i].user_id);

                    var recipient = usersLoggedIn[i].user_id;

                    var pmMsgObj = {
                        "sender": client.id,
                        "reciever": recipient,
                        "message": result
                    };
                    client.broadcast.to(recipient).emit('pm', pmMsgObj);
                    client.emit('pm', pmMsgObj);

                }
            }

        }

    });
    client.on('pmTwo', function(msg) {


        var n = msg.includes("pm");
        if (n == true) {
            console.log('Got it!');

            var str = msg;
            // var str = 'one:two;three';     
            var getReciever = str.split(':').pop().split(';').shift(); // returns 'two'
            console.log(getReciever);

            var getPM = msg.split(";");
            var result = getPM.pop();

            for (var i = 0; i < usersLoggedIn.length; i++) {

                if (usersLoggedIn[i].user_data.u_name == getReciever) {
                    console.log('here is the match : ' + usersLoggedIn[i].user_id);

                    var recipient = usersLoggedIn[i].user_id;

                    var pmMsgObj = {
                        "sender": client.id,
                        "reciever": recipient,
                        "message": result
                    };
                    client.broadcast.to(recipient).emit('pmTwo', pmMsgObj);
                    client.emit('pmTwo', pmMsgObj);

                }
            }

        }

    });


});





app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');


});