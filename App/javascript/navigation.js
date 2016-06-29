(function () {
    var init = function () {
        $('#button_menu').on('click', toggleMenu);
        $('*').on('click', closeMenu);
        checkLogin();
    };

    window.addEventListener('load', init);

})();

var menuOpen = false;

function checkLogin(){
    if(readCookie("name")){
            $('header ul').append('<a href="events.html"><li>Event</li></a>');
            $('header ul').append('<a href="logout.html"><li>Logout</li></a>');
            $('#registratiePagina').remove();
            $('#loginPagina').remove();
    }
}

function toggleMenu(){
    if(menuOpen == false)
    {
        TweenLite.to($('header ul'), 0.2, {height: "25vh",  ease: Power2.easeOut});
        menuOpen = true;
    } else {
        TweenLite.to($('header ul'), 0.2, {height: "0",  ease: Power2.easeOut});
        menuOpen = false;
    }
}

function closeMenu(e){
    if(menuOpen == true
        && $(e.target).context.tagName != "UL"
        && $(e.target).context.tagName != "BUTTON"
        && $(e.target).context.tagName != "LI"
        && $(e.target).context.tagName != "A"){
        TweenLite.to($('header ul'), 0.2, {height: "0",  ease: Power2.easeOut});
        menuOpen = false;
    }
}