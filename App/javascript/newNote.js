/**
 * Created by Jonathan on 29-6-2016.
 */
(function () {
    var init = function () {
        submitHandler();
    };

    window.addEventListener('load', init);

})();

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

function submitHandler(){
    $('#newNoteBox').on('submit', sendNote);
}

function sendNote(e){
    e.preventDefault();
    var id = getUrlParameter('id');
    var title = $('#title').val();
    var problem = $('#problem').val();
    var solution = $('#solution').val();
    if(title != null && title != "" &&
        problem != null && problem != "" &&
        solution != null && solution != "" &&
        id != null
    ) {
        createNote(title, problem, solution, id);

    } else {
        $('#notice p').text('Niet alles is ingevuld');
    }

}

function createNote(title, problem, solution, id) {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/notes",
        method: "POST",
        dataType: 'json',
        data: '{"title": "' + title + '","problem": "' + problem + '","solution": "' + solution + '","imageUrls": [],"eventId": "' + id + '","userId": 1,"userKey": "202cb962ac59075b964b07152d234b70"}',
        complete: successPost
    })
}

function  successPost(){
    $('#notice p').text('Gelukt!');
    setTimeout(function () {
        window.location.href = 'eventPage.html?id=' + getUrlParameter('id');
    }, 700);
}