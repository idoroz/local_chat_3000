$(document).ready(function() {
    console.log("ready!");

    console.log('yes im linked!');
    $('#login-button').on('click', function(e){
	e.preventDefault();
	var userInputName = $('#userName').val();
	console.log(userInputName);
enterChat();
});

function enterChat(){

    var userInputName = $('#userName').val();
    var currentUser = userInputName;
    if (currentUser == 'undefined') {
        currentUser = '';
    }
    var socket = io();

    socket.emit('send_nick', currentUser);

    socket.on('send_nick', function(login_msg) {
        $('#messages').append($('<li>').text(login_msg+' just logged in'));

    });

    socket.emit('disconnect', currentUser);

    socket.on('log out', function(logout_msg) {
        $('#messages').append($('<li>').text(logout_msg+' just logged out!'));

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
