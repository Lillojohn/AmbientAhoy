(function () {
    var init = function () {
        ajaxloadNote();
    };

    window.addEventListener('load', init);

})();

noteInfo = "";

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


function ajaxloadNote() {
    $.ajax({
        url: "http://www.timfalken.com/hr/annualnotes/notes/" + getUrlParameter('id'),
        accepts: "json",
        success: loadNote
    })
}

function loadNote(data) {
    noteInfo = data;

    editInfo();
}

function editInfo() {
    $('#title').text(noteInfo.title);
    $('#problem').text("Probleem: " + noteInfo.problem);
    $('#solution').text("Oplossing: " + noteInfo.solution);
}