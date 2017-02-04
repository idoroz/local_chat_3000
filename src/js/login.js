
$( document ).ready(function() {
    console.log( "ready!" );

$('#login-button').on('click', function(e){
	e.preventDefault();
	var userInputName = $('#userName').val();
	console.log(userInputName);
loginSuccess();
})


function loginSuccess() {
//	  var socket = io();
        $('form.loginForm').fadeOut(700, loadIt);
        $('.wrapper').addClass('form-success');

 //    socket.emit('send_nick', $('#userName').val());
 //    $('#userName').val('');
 //    return false;

 //    socket.on('send_nick', function(send_nick){
 //    console.log(send_nick);
	// currentUser = send_nick;

 //  });

}

function loadIt() {
    setTimeout(function(){ 
    // window.location.pathname = '/chat';
    $('#loginWrapper').addClass('hidden');
    $("#chatroom").removeClass('hidden');
    }, 1000);
}

});



     
       