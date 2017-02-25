$(document).ready(function() {
    console.log("ready!");
   





        $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

    var avatars = ["cloud", "tree-deciduous", "tree-conifer", "thumbs-up", "star-empty", "send", "music", "heart", "glass", "copyright-mark", "check", "certificate", "user", "queen", "play", "picture", "globe", "earphone", "cutlery", "wrench", "tent", "screenshot", "off", "knight", "signal", "scissors", "record", "info-sign", "briefcase", "apple", "trash", "sunglasses", "piggy-bank", "paperclip", "ok-circle", "ice-lolly-tasted", "grain", "comment", "bullhorn", "time", "link", "eye-open", "usd", "random", "play-circle", "download", "headphones", "flag", "fire", "volume-up", "leaf", "shopping-cart", "qrcode", "gift", "bookmark", "camera", "bell", "tint", "adjust"];
    console.log(avatars)

    function randomColorValue() {
        return parseInt(Math.random() * 255);
    }

    function randomAvatarValue() {
        return parseInt(Math.random() * 60)
    }
    getAvatars();
    getColors();


    function getColors() {
        var colorPalette = document.querySelector('#color-palette');
        var colorCount = 9;
        for (var i = 0; i < colorCount; i++) {
            var colorElement = document.createElement('div');
            colorElement.className = 'color';
            colorElement.style.backgroundColor = 'rgb(' +
                randomColorValue() + ',' +
                randomColorValue() + ',' +
                randomColorValue() + ')';
            colorPalette.appendChild(colorElement);
        }
    }


    function getAvatars() {
        var avatarPalette = document.querySelector('#avatar-palette');
        var avatarCount = 9;
        for (var i = 0; i < avatarCount; i++) {
            var avatarElement = document.createElement('div');
            var avatarSpan = document.createElement('span');

            avatarElement.className = 'avatar';

            var spanClass = 'glyphicon glyphicon-' + avatars[randomAvatarValue()];

            if (spanClass != "glyphicon glyphicon-undefined") {
                avatarSpan.className = spanClass;

                avatarElement.appendChild(avatarSpan);
                avatarPalette.appendChild(avatarElement);
            }
        }
    }

    $('#color-palette').on('click', function(e) {
        var a = $(e.target).attr("style")
        console.log(a);
        var b = a.substr(18);
        var selectedColor = b.slice(0, -1);
        changeColor(selectedColor);
    })

    $('#avatar-palette').on('click', function(e) {
        var a = $(e.target);
        var outerHTML = a[0].outerHTML;
        var b = outerHTML.substr(33);
        var selectedAvatar = b.slice(0, -9);
        changeAvatar(selectedAvatar);
    })

    function changeColor(x) {
        $('.check').css({
            'background-color': x
        });
    }

    function changeAvatar(x) {
        $('.check span').attr('class', "glyphicon glyphicon-" + x);
    }

    $('#save').on('click', function() {
        var userAvatar = $('.check span').attr('class');
        var userColor = $('.check').css('background-color');

        var userObj = {
            avatar: userAvatar,
            color: userColor
        }
        console.log(userObj)

    })

    // getColors();
    // getAvatars();

    $('#randColor').on('click', function() {
        $('#color-palette').empty();
        getColors();

    })

    $('#randAvatar').on('click', function() {
        $('#avatar-palette').empty();
        getAvatars();

    })

    console.log('yes im linked!');

    $('form.loginForm').keypress(function(e) {
        var code = e.keyCode || e.which;

        if (code === 13) {
            e.preventDefault();
            // console.log('presed');
            $('#login-button').click()
            return false;
        }
    })


    $('#login-button').on('click', function(e) {
        e.preventDefault();
        var userInputName = $('#userName').val();
        console.log(userInputName);
        loginSuccess();

    });

    function enterChat() {

        var userInputName = $('#userName').val();
        var userInputColor = $('.check').css('background-color');
        var userInputAvatar = $('.check span').attr('class');
        var currentUser = userInputName;
        if (currentUser == 'undefined') {
            currentUser = '';
        }

        var youUser = {
            u_name: currentUser,
            u_color: userInputColor,
            u_avatar: userInputAvatar

        };
        var usersOnline = [];
        var List = [];
        var socket = io();

        socket.emit('send_nick', youUser);
        socket.on('send_nick', function(login_msg) {

            var now = moment();
            var lTime = moment().calendar(now);
            var loginTime = lTime.replace('Today', '');

            $('#messages').append($('<li style="color:' + login_msg.u_color + '">').text(login_msg.u_name + ' logged in ' + loginTime));
        });


        socket.emit('userList', usersOnline);
        socket.on('userList', function(list) {

            console.log(list);
            $("#users").empty();
            $.each(list, function(key, value) {
                var li_user = '<li class="userTab" id ="' + list[key].user_id + '"><div class="addgreen"></div>' + list[key].user_data.u_name + '<div class="userAvatar" style="background-color:' + list[key].user_data.u_color + '"><span class="' + list[key].user_data.u_avatar + '"></span></div></li>';
                usersOnline.push(value);

                $('#users').append(li_user);

            });
        });

        socket.on('log out', function(user_id) {
            socket.emit('log out', user_id);
            var userLogOut_name = '';
            var userLogOut_color = '';
            for (var i = 0; i < usersOnline.length; i++) {
                if (usersOnline[i].user_id == user_id) {
                    console.log(usersOnline[i])
                    userLogOut_name = usersOnline[i].user_data.u_name;
                    userLogOut_color = usersOnline[i].user_data.u_color;
                }
            }
            var now = moment();
            var lTime = moment().calendar(now);
            var logoutTime = lTime.replace('Today', '');
            $('#messages').append($('<li style="color:' + userLogOut_color + '">').text(userLogOut_name + ' logged out ' + logoutTime));

        });

            $("ul#users").on('click', function(e) {
        var nodeSelected = event.target.nodeName;
        var userSelected;
        var userSelectedName;

        if (nodeSelected == "LI" || "DIV" || "SPAN") {

            if (nodeSelected == "LI") {
                userSelected = event.target.id;

            }
            if (nodeSelected == "DIV") {
                userSelected = event.target.parentElement.id;

            }
            if (nodeSelected == "SPAN") {
                userSelected = event.target.parentElement.parentElement.id;
            }

        }
        

        socket.emit('userList', usersOnline);
        socket.on('userList', function(list) {
            $.each(list, function(key, value) {
                var li_id = list[key].user_id 
                var li_name =  list[key].user_data.u_name 

if(li_id == userSelected) {
  userSelectedName = li_name;
}

            });
            $('#pmChat').text(userSelectedName);
            $('#mainChat').removeClass('current');
            $('#pmChat').click();
             // $('#pm').val('pm :'+userSelectedName+';');
        });


    });

        $('form.chatForm').submit(function() {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('chat message', function(msgObj) {
            console.log(msgObj)
            var sender_name = '';
            var sender_color = '';
            for (var i = 0; i < usersOnline.length; i++) {
                if (usersOnline[i].user_id == msgObj.client) {
                    sender_name = usersOnline[i].user_data.u_name;
                    sender_color = usersOnline[i].user_data.u_color;
                }
            }
            if (msgObj.message != "") {


                $('#messages').append($('<li style="color:' + sender_color + '">').text(sender_name + ' : ' + msgObj.message));
            }
        });


        $('form.pmForm').submit(function() {

            var pmMsg = $('#pm').val();
            var pmPrefix = $('#pmChat').text();
            console.log(pmPrefix)
            var pmFull = 'pm :'+pmPrefix+';'+pmMsg;
            socket.emit('pm', pmFull);
            $('#pm').val('');
            return false;
        });



        socket.on('pm', function(msgObj) {
             

            console.log(msgObj)
            var sender_name = '';
            var sender_color = '';
            for (var i = 0; i < usersOnline.length; i++) {
                if (usersOnline[i].user_id == msgObj.sender) {
                    sender_name = usersOnline[i].user_data.u_name;
                    sender_color = usersOnline[i].user_data.u_color;
                }
            }

           
            
               $('#pmChat').text(sender_name);
               console.log(youUser)
            $('#private_messages').append($('<li style="color:' + sender_color + '">').text(sender_name + ' : ' + msgObj.message));

        });


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
            timeout = setTimeout(timeoutFunction, 600);
        });


        socket.on('typing', function(data) {
            if (data) {
                $('#' + data + ' div.addgreen').addClass('green');
            }
        });

        socket.on('stopTyping', function(data) {
            if (data) {
                $('#' + data + ' div.addgreen').removeClass('green');
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
