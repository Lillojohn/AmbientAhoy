(function () {
    var init = function () {
        $('#registerForm').on('submit', createUser);
    };

    window.addEventListener('load', init);

})();

var registered = false;

function createUser(e) {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();

    console.log(registered);

    if(registered == false ){
        if( (name != null && name != "") &&
            (email != null && email != "") &&
            (password != null && password != "")){

            $.ajax({
                url: "http://timfalken.com/hr/annualnotes/users",
                method: "POST",
                dataType: "json",
                data: '{"name": "'+ name +'","email":"'+ email +'","password":"'+ password +'"}',
                complete: userSuccess
            })

        } else {
            $('#notice p').text("Niet alles is goed ingevuld");
            TweenLite.from($('#notice p'), 0.2, {opacity: 0,  ease: Power2.easeOut})
        }
    } else {
        $('#notice p').text("Je hebt al een account gemaakt");
        TweenLite.to($('#notice p'), 0.2, {color: "#FFABDA",  ease: Power2.easeOut});
        TweenLite.from($('#notice p'), 0.2, {opacity: 0,  ease: Power2.easeOut});
    }

}

function userSuccess(){
    $('#notice p').text("Bedankt voor het registreren!");
    TweenLite.to($('#notice p'), 0.2, {color: "#AFFF7E",  ease: Power2.easeOut});
    TweenLite.to($('.button'), 0.2, {background: "rgba(34, 58, 58, 0.18)",  ease: Power2.easeOut});
    TweenLite.from($('#notice p'), 0.2, {opacity: 0,  ease: Power2.easeOut});
    registered = true;
}

