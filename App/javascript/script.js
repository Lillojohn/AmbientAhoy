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

function createNote() {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/notes",
        method: "POST",
        data: {
            "title": "test",
            "problem": "need to test POST",
            "solution": "this, hopefully",
            "imageUrls": [],
            "eventId": 1,
            "userId": 1,
            "userKey": "202cb962ac59075b964b07152d234b70"
        }
    })
}

function createEvent() {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/notes",
        method: "POST",
        data: {
            "name": "EVENTNAME",
            "date": "D-M",
            "userId": 1,
            "userKey": "202cb962ac59075b964b07152d234b70"
        }
    })
}

function createUser() {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/users",
        method: "POST",
        data: {
            "name":"Lillojohn",
            "email":"johnyemanuels@hotmail.com",
            "password":"132456"
        }
    })
}

createUser();


function addClickHandler() {
    $('.event').on("click", clickAnimation);
}

function loadEvents(data) {
    console.log(data);
    data.items.map(item => createEvents(item));
}


function createEvents(object) {
    var event = "<section id='" + object.id + "' class='event shadow'>" +
        "<h1>" + object.name + "</h1>" +
        "<img src='img/hellokitty.png' />" +
        "<div class='clickAnimation'></div></section>"
    $('#events').append(event);
}


function clickAnimation(e) {
    console.log('oi')

    var t1 = new TimelineLite();
    var positionButton = $(this).offset();
    var relativeClickY = event.pageY - positionButton.top;
    var relativeClickX = event.pageX - positionButton.left;
    var originalClickAnimation = $('.clickAnimation').clone();
    $('.clickAnimation').css("top", relativeClickY);
    $('.clickAnimation').css("left", relativeClickX);
    t1.to($('.clickAnimation'), 0.2, {scale: 200, opacity: 0.8, ease: Power2.easeOut});
    t1.to($('.clickAnimation'), 0.1, {borderRadius: "0", top: 0, left: 0, ease: Power2.easeOut});
    t1.to($('.clickAnimation'), 0.1, {opacity: 0, ease: Power2.easeOut});

    t1.to($('img'), 0.2, {'-webkit-filter': 'grayscale(10%)', ease: Power2.easeOut}, "-=0.2")
    setTimeout(function () {
        $(".clickAnimation").replaceWith(originalClickAnimation);
    }, 700);

}
