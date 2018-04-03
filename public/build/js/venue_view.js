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
              '<a href="/floor/'+item.floor_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/floor_map/'+item.floor_id+'" class="btn btn-primary btn-xs"><i class="fa fa-trello"></i> Show Map </a>'+
              '<a href="/floor/'+item.floor_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removefloor" data-id="'+item.floor_id+'" data-toggle="modal" class="btn btn-danger btn-xs floor_delete" onclick="floor_delete(this)"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
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

floor_delete = function(element) {
  console.log (element.dataset);
  $('#removefloorform .form_submit').attr('data-floorid', element.dataset.id);
}

$('#removefloorform .form_submit').click(function(){
  var id = $(this).data('floorid');
  var venueid = $('#venue_id').val();
  $.ajax({
    method: "POST",
    url: "/delete_floor/"+id,
    data: { venueid: venueid},
  })
      .done(function( msg ) {
        var html_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="floor_progress"><div class="progress progress_sm">' +
              '<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="57"></div></div><small>57% Running</small></td><td>' +
              '<button type="button" class="btn btn-success btn-xs">Success</button></td><td>' +
              '<a href="/floor/'+item.floor_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/floor_map/'+item.floor_id+'" class="btn btn-primary btn-xs"><i class="fa fa-trello"></i> Show Map </a>'+
              '<a href="/floor/'+item.floor_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removefloor" data-id="'+item.floor_id+'" data-toggle="modal" class="btn btn-danger btn-xs floor_delete" onclick="floor_delete(this)"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
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

$('#goto_setting').click(function () {
  var addstr = '';
  if (window.location.href.substr(window.location.href.length - 1) != '/') {
    addstr = '/';
  }
  window.location.href = window.location.href + addstr + 'setting';
  //var url = window.location.href + '/setting';
  //console.log (url);
})

$(document).ready(function() {
  var venue_id = $('#venue_id').val();
  $.ajax({
    method: "POST",
    url: "/get_floors/"+venue_id,
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
              '<a href="/floor_map/'+item.floor_id+'" class="btn btn-primary btn-xs"><i class="fa fa-trello"></i> Show Map </a>'+
              '<a href="/floor/'+item.floor_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removefloor" data-id="'+item.floor_id+'" data-toggle="modal" class="btn btn-danger btn-xs floor_delete" onclick="floor_delete(this)"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
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