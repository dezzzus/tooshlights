$(document).ready(function() {
  $('#floor_submit').click(function(evt) {
    evt.preventDefault();
    var floor = {
      map_file : $('.floor_device_list img').attr('src'),
      floor_id : $('#floorid').val(),
      name : $('#floor_name').val(),
      description : $('#description').val(),
      parent_venue : $('#venue_id').val(),
      map_width : $('#mapwidth').val(),
      map_height : $('#mapheight').val(),
      avg_vacant_time : 0
    };
    $.ajax({
      method: "POST",
      url: "/api/add_floor",
      data: floor,
      /*success: function(data) {
       console.log (data);
       },*/
    })
        .done(function( msg ) {
          window.location.href = '/floor/'+floor.floor_id+'/';
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
          console.log (jqXHR);
          console.log (textStatus);
        });
  });
});