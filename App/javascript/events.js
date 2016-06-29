/**
 * Created by Jonathan on 15-6-2016.
 */
(function () {
    var init = function () {
        ajaxloadEvents();
    };

    window.addEventListener('load', init);

})();


function ajaxloadEvents() {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/events",
        accepts: "json",
        success: loadEvents,
        complete: addClickHandler
    })
}



//function createEvent() {
//    $.ajax({
//        url: "http://timfalken.com/hr/annualnotes/events",
//        method: "POST",
//        dataType: "json",
//        data: {
//            "name": "Kip Conferentie",
//            "date": "4-8",
//            "userId": 1,
//            "userKey": "202cb962ac59075b964b07152d234b70"
//        }
//    })
//}




function addClickHandler() {
    $('.event').on("click", clickAnimation);
}

function loadEvents(data) {
    console.log(data);
    data.items.map(item => createEvents(item));
}



function createEvents(object) {

    var imgpath = "";

    if(object.name == "Hello Kitty Live"){
        imgpath = "img/hellokitty.png";
    } else if (object.name == "Walnoten Festival"){
        imgpath = "img/walnoten.png"
    } else if(object.name == "Kip Conferentie"){
        imgpath = "img/kip.jpg"
    }

    console.log(object.name);

    var event = "<section id='" + object.id + "' class='event shadow'>" +
        "<h1>" + object.name + "</h1>" +
        "<img src='"+ imgpath +"' />" +
        "<div class='clickAnimation'></div></section>"
    $('#events').append(event);
}


function clickAnimation(e) {
    var id = $(this).attr('id');

    var clickanimation = $(this).context.lastChild;

    var img = $(this).children('img');

    var t1 = new TimelineLite();
    var positionButton = $(this).offset();
    var relativeClickY = event.pageY - positionButton.top;
    var relativeClickX = event.pageX - positionButton.left;
    var originalClickAnimation = $(clickanimation).clone();
    $(clickanimation).css("top", relativeClickY);
    $(clickanimation).css("left", relativeClickX);
    t1.to($(clickanimation), 0.2, {scale: 200, opacity: 0.8, ease: Power2.easeOut});
    t1.to($(clickanimation), 0.1, {borderRadius: "0", top: 0, left: 0, ease: Power2.easeOut});
    t1.to($(clickanimation), 0.1, {opacity: 0, ease: Power2.easeOut});

    t1.to($(img), 0.2, {'-webkit-filter': 'grayscale(10%)', ease: Power2.easeOut}, "-=0.2");
    setTimeout(function () {
        $(img).replaceWith(originalClickAnimation);
        window.location.href = 'eventPage.html?id=' + id;
    }, 700);

}
