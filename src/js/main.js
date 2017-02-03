
$( document ).ready(function() {
    console.log( "ready!" );

console.log('yes im linked!');

  var socket = io();
  $('form.loginForm').submit(function(){
    socket.emit('user name', $('#userName').val());
    $('#userName').val('');
    return false;
  });
    socket.on('user name', function(user_name){
    console.log(user_name);
  });

  $('form.chatForm').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
    socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });





});