(function () {
    var init = function () {
        $('#registerForm').on('submit', createUser);
    };

    window.addEventListener('load', init);

})();

function createUser(e) {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();

    if( (name != null && name != "") &&
        (email != null && email != "") &&
        (password != null && password != "")){

        $.ajax({
            url: "http://timfalken.com/hr/annualnotes/users",
            method: "POST",
            dataType: "json",
            data: '{"name": "'+ name +'","email":"'+ email +'","password":"'+ password +'"}'
        })

    } else {

    }


}

