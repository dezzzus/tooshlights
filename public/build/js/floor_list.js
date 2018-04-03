$('#addfloor .form_submit').click(function () {
  var name = $('#addfloor #name').val();
  var id = $('#addfloor #floorid').val();
  var desc = $('#addfloor #description').val();
  $.ajax({
    method: "POST",
    url: "/add_floor",
    data: { name: name, floorid: id, description: desc},
    /*success: function(data) {
     console.log (data);
     },*/
  })
      .done(function( msg ) {
        var html_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="floor_progress"><div class="progress progress_sm">' +
              '<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="57"></div></div><small>57% Running</small></td><td>' +
              '<button type="button" class="btn btn-success btn-xs">Success</button></td><td>' +
              '<a href="#" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
        });
        $('#floor_list').html(html_text);
        // Progressbar
        if ($(".progress .progress-bar")[0]) {
          $('.progress .progress-bar').progressbar();
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
})

$(document).ready(function() {
  $.ajax({
    method: "POST",
    url: "/get_floors",
    //data: { name: name, id: id, description: desc},
  })
      .done(function( msg ) {
        console.log (msg);
        var html_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="floor_progress"><div class="progress progress_sm">' +
              '<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="57"></div></div><small>57% Running</small></td><td>' +
              '<button type="button" class="btn btn-success btn-xs">Success</button></td><td>' +
              '<a href="/floor/'+item.floor_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/floor/'+item.floor_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#" data-id="'+item.floor_id+'" class="btn btn-danger btn-xs floor_delete"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
        });
        $('#floor_list').html(html_text);
        // Progressbar
        if ($(".progress .progress-bar")[0]) {
          $('.progress .progress-bar').progressbar();
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
});