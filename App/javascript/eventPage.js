/**
 * Created by Jonathan on 29-6-2016.
 */
(function () {
    var init = function () {
        ajaxloadEvents();
    };

    window.addEventListener('load', init);

})();

itemInfo = "";

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function ajaxloadEvents() {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/events",
        accepts: "json",
        success: loadEvents
    })
}

function loadEvents(data) {

    data.items.map(item => {
        if(getUrlParameter("eventName") == item.name){
            itemInfo = item;
        }
    });

editInfo();

}

function editInfo(){
    $('#Datum').text('Datum: ' + itemInfo.date)

    $('#notes').children().remove();



    itemInfo.notes.map(item => {
        $('#notes').append('<a class="noteLink" href="noteDetail.html">' +
            '<div class="note"><div class="noteDetails">' +
            '<p class="noteTitle">'+ item.title +'</p>' +
            '</div>' +
            '</div>' +
            '</a>')
    });


}

