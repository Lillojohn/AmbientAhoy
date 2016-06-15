
function createUser() {
    $.ajax({
        url: "http://timfalken.com/hr/annualnotes/users",
        method: "POST",
        dataType: "json",
        data: '{"name":"John","email":"johnyemanuels@hotmailz.nl","password":"132456"}',
        complete: function(data){
            console.log(data)
        }
    })
}
