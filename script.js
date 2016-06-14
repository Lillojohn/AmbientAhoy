(function (){
    var init = function(){
        ajaxloadEvents();
        $('.event').on("click", clickAnimation);
    };

    window.addEventListener('load', init);

})();


function ajaxloadEvents(){
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/events",
        accepts: "json",
        success: loadEvents
    })
}

function loadEvents(data){
    data.items.map(item => createEvents(item));


}

function createEvents(object){
    var event = "<section id='"+ object.id +"' class='event shadow'>" +
        "<h1>"+ object.name +"</h1>" +
        "<img src='hellokitty.png' />" +
        "<div class='clickAnimation'></div></section>"
    console.log(event)
    $('#events').append(event);
}



function clickAnimation(e) {
    var t1 = new TimelineLite();
    var positionButton = $(this).offset();
    var relativeClickY = event.pageY - positionButton.top;
    var relativeClickX = event.pageX - positionButton.left;
    var originalClickAnimation = $('.clickAnimation').clone();
    $('.clickAnimation').css("top", relativeClickY);
    $('.clickAnimation').css("left", relativeClickX);
    t1.to($('.clickAnimation'), 0.2, {scale: 200, opacity: 0.8, ease: Power2.easeOut});
    t1.to($('.clickAnimation'), 0.1, {borderRadius: "0",top: 0, left: 0,  ease: Power2.easeOut});
    t1.to($('.clickAnimation'), 0.1, {opacity: 0, ease: Power2.easeOut});

    t1.to($('img'), 0.2, {'-webkit-filter':'grayscale(10%)',ease: Power2.easeOut} , "-=0.2" )
    setTimeout(function () {
        $(".clickAnimation").replaceWith(originalClickAnimation);
    }, 700);
}
