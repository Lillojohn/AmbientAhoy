/**
 * Created by Jonathan on 29-6-2016.
 */
(function () {
    var init = function () {
        loginHome();
    };

    window.addEventListener('load', init);

})();

function loginHome(){
    if(readCookie("name")){
        $('.cookieRemove').remove();
        $('#naam').text(readCookie('name'));
    } else {
        $('.cookieAdd').remove();

    }
}
