
$( document ).ready(function() {
    console.log( "ready!" );

$('#login-button').on('click', function(){
loginSuccess();
})


function loginSuccess() {
        $('form.loginForm').fadeOut(700, loadIt);
        $('.wrapper').addClass('form-success');
}

function loadIt() {
    setTimeout(function(){ 
    window.location.pathname = '/chat';
    }, 1000);
}

});



     
       