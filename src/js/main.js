$(document).ready(function() {
    console.log("ready!");

    console.log('yes im linked!');
    $('#login-button').on('click', function(e) {
        e.preventDefault();
        var userInputName = $('#userName').val();
        console.log(userInputName);
        enterChat();
    });

    function enterChat() {

        var userInputName = $('#userName').val();
        var currentUser = userInputName;
        if (currentUser == 'undefined') {
            currentUser = '';
        }
        var usersOnline = [];

        var socket = io();

        socket.emit('send_nick', currentUser);
        socket.on('send_nick', function(login_msg) {
            $('#messages').append($('<li>').text(login_msg + ' just logged in'));
        });


        socket.emit('userList', usersOnline);
        socket.on('userList', function(list) {
            for (var i = 0; i < list.length; i++) {
                if (list.indexOf(list[i]) > -1) {
                    usersOnline.push(list[i]);
                }
            }
            var List = usersOnline;

            $.unique(List);
            console.log(List);
            $("#users").empty();
            for (var x = 0; x < List.length; x++) {
                $('#users').append($('<li>').text(List[x]));
            }
        });

        socket.on('log out', function(logout_msg) {
            $('#messages').append($('<li>').text(logout_msg + ' just logged out!'));
            var user_logginOut = usersOnline.indexOf(logout_msg);
            if (user_logginOut > -1) {
                usersOnline.splice(user_logginOut, 1);
            }
            $("#users").empty();
            for (var x = 0; x < usersOnline.length; x++) {
                $('#users').append($('<li>').text(usersOnline[x]));
            }
        });

        $('form.chatForm').submit(function() {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('chat message', function(msg) {
            $('#messages').append($('<li>').text(msg));

        });



    };

});
