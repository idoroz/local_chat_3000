$(document).ready(function() {
    console.log("ready!");

    console.log('yes im linked!');
    $('#login-button').on('click', function(e) {
        e.preventDefault();
        var userInputName = $('#userName').val();
        console.log(userInputName);
        loginSuccess()

    });

    function enterChat() {

        var userInputName = $('#userName').val();
        var currentUser = userInputName;
        if (currentUser == 'undefined') {
            currentUser = '';
        }
        var usersOnline = [];
        var List = [];
        var socket = io();

        socket.emit('send_nick', currentUser);
        socket.on('send_nick', function(login_msg) {

            var now = moment();
            var lTime = moment().calendar(now);
            var loginTime = lTime.replace('Today','');

            $('#messages').append($('<li>').text(login_msg + ' logged in ' + loginTime));
        });


        socket.emit('userList', usersOnline);
        socket.on('userList', function(list) {

            console.log(list);
            $("#users").empty();
            $.each(list, function(key, value) {
var li_user = '<li id ="'+list[key].user_id+'">'+list[key].user_name+'<div class="green"></div></li>';
                usersOnline.push(value);

                $('#users').append(li_user);

            });
        });

        socket.on('log out', function(user_id) {
            socket.emit('log out', user_id);
            var userLogOut_name = '';
            for (var i = 0; i < usersOnline.length; i++) {
                if (usersOnline[i].user_id == user_id) {
                    userLogOut_name = usersOnline[i].user_name;
                }
            }
                        var now = moment();
            var lTime = moment().calendar(now);
            var logoutTime = lTime.replace('Today','');
            $('#messages').append($('<li>').text(userLogOut_name + ' logged out ' + logoutTime));

        });

        $('form.chatForm').submit(function() {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('chat message', function(msgObj) {
            console.log(msgObj)
            var sender_name = '';
                     for (var i = 0; i < usersOnline.length; i++) {
                if (usersOnline[i].user_id == msgObj.client) {
                    sender_name = usersOnline[i].user_name;
                }
            }
               $('#messages').append($('<li>').text(sender_name + ' : '+ msgObj.message));

        });

        // $( "#m" ).keyup(function(e) {
        // socket.emit('user typing', 'typing');
        // return false;
        //    });
        // socket.on('user typing', function(clientID){
        //     $('#messages').append($('<li>').text(clientID + ' is typing'));
        // })

var timeout;
var userTyping;


function timeoutFunction() {
    typing = false;
    socket.emit("typing", false);
     
     stoppedTyping();
}

function stoppedTyping() {
 socket.emit('stopTyping', 'typing...');   
}


$('#m').keyup(function() {
    console.log('happening');
    typing = true;
    socket.emit('typing', 'typing...');
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 1000);
});


socket.on('typing', function(data) {
    if (data) {
     $('#'+data).addClass('isTyping');
    } 
});

socket.on('stopTyping', function(data) {
    if (data) {
     $('#'+data).removeClass('isTyping');
}
});

     



    };







    function loginSuccess() {
        //    var socket = io();
        $('form.loginForm').fadeOut(700, loadIt);
        $('.wrapper').addClass('form-success');
    }

    function loadIt() {
        setTimeout(function() {
            // window.location.pathname = '/chat';
            $('#loginWrapper').addClass('hidden');
            $("#chatroom").removeClass('hidden');
        }, 1000);
        enterChat();
    }



});
