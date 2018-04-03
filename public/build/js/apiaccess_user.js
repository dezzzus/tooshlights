var username
$(document).ready(function() {
  username = $('#username').val();
  $.ajax({
    method: "POST",
    url: "/get_user_by_name/"+username,
    //data: { name: name, id: id, description: desc},
  })
      .done(function( msg1 ) {
        if (msg1.apiaccess) {
          msg1.apiaccess.split(',').forEach(function (item) {
            $('#'+item+'_access').prop('checked', true);
          });
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
});

$('#save_change').click(function (e) {
  var checked_venues = '';
  $('#venue_table input:checked').each(function() {
    if (checked_venues)
      checked_venues += ',';
    checked_venues += $(this).attr('venue');
  });
  console.log (checked_venues);
  $.ajax({
    method: "POST",
    url: "/api/user_access/"+username,
    data: { apiaccess: checked_venues},
  })
      .done(function( msg ) {
        window.location.href = '/dashboard/apiaccess';
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
})