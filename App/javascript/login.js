/**
 * Created by Jonathan on 27-6-2016.
 */
(function () {
    var init = function () {
        $('#formLogin').on('submit', login);
        getAccounts();
        checkCookie()
    };

    window.addEventListener('load', init);

})();


var loggedIn = false;
var userData = {};
var loginSuccess = false;

function checkCookie(){
    if(readCookie("name")){
        $('#notice').append("<p>Ingelogd als " + readCookie("name") + '</p>');
    }
}

function login(e){
    e.preventDefault();

    var emailValue = $('#email').val();
    var passwordValue = $('#password').val();

    if(emailValue != "" && emailValue != null &&
        passwordValue != "" && passwordValue != null){
        userData.items.map(function(item, index){
            if(item.email == emailValue){
                succesLogin(item.name);
                loginSuccess = true;
            }
        })
        if(loginSuccess == false){
            $('#notice').append('<p>Username and Password do not match</p>');
        }
    } else {
        $('#notice').append('<p>Username and Password do not match</p>');
        console.log(emailValue + " " + passwordValue)
    }
}

function getAccounts(){
    console.log('de');
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/users",
        method: "GET",
        success: users
    })
}

function users(data){
    userData = data;
}

function succesLogin(name){
    createCookie("name", name, null);
    $('#notice').append('<p>Welkom ' + name + '</p>');
}