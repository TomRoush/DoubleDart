// $(function() {
//     $('button').click(function() {
//         var user = $('#txtUsername').val();
//         var pass = $('#txtPassword').val();
//         $.ajax({
//             url: '/results',
//             data: $('form').serialize(),
//             type: 'POST',
//             success: function(response) {
//                 console.log(response);
//             },
//             error: function(error) {
//                 console.log(error);
//             }
//         });
//     });
//
    // $('#upload').on('click', function() {
    //     upload($('input[name="username"]').val(), $('input[name="gpx"]').val(), );
    // })

    function upload(sourceId, destId, loadingId) {
        // console.log(sourceId + ", " + destId + ", " + loadingId);
        // console.log($(sourceId) + ", " + $("#nameField").val());
        $(destId).hide();
        $(loadingId).show();
        $.post('/results', {
            user: $("#nameField").val(),
            gpx: $("#gpxField").val()
        }).done(function(up) {
            $(loadingId).hide();
            $(destId).text(up['user'] + up['gpx']);
            $(destId).show();
        }).fail(function() {
            $(destId).text("{{ _('Error: Could not contact server.') }}");
            $(loadingId).hide();
            $(destId).show();
        });
    }
// }
// });

