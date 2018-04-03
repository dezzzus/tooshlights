$('#addvenueform .form_submit').click(function () {
  var name = $('#addvenueform #name').val();
  var id = $('#addvenueform #venueid').val();
  var desc = $('#addvenueform #description').val();
  $.ajax({
    method: "POST",
    url: "/add_venue",
    data: { name: name, venueid: id, description: desc},
    /*success: function(data) {
     console.log (data);
     },*/
  })
      .done(function( msg ) {
        var html_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="venue_progress"><div class="progress progress_sm">' +
              '</div><small></small></td><td>' +
              '</td><td>' +
              '<a href="/venue/'+item.venue_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/venue/'+item.venue_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#" data-id="'+item.venue_id+'" class="btn btn-danger btn-xs venue_delete"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
        });
        $('#venue_list').html(html_text);
        // Progressbar
        if ($(".progress .progress-bar")[0]) {
          $('.progress .progress-bar').progressbar();
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
  $('#addvenueform input').val('');
})

$('#adduserform .form_submit').click(function () {
  var name = $('#adduserform #username').val();
  var email = $('#adduserform #email').val();
  var pwd = $('#adduserform #password').val();
  var role = $('#role').selectpicker('val');
  var permission = $('#permission').selectpicker('val').join('|');
  $.ajax({
    method: "POST",
    url: "/add_user",
    data: { username: name, email: email, password: pwd, role: role, permission: permission},
    /*success: function(data) {
     console.log (data);
     },*/
  })
      .done(function( msg ) {

      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
  $('#adduserform input').val('');
})

venue_delete = function(element) {
  $('#removevenueform .form_submit').attr('data-venueid', element.dataset.id);
}

$('#removevenueform .form_submit').click(function(){
  var id = $(this).data('venueid');
  $.ajax({
    method: "POST",
    url: "/delete_venue",
    data: { venueid: id},
  })
      .done(function( msg ) {
        var html_text = '';
        var permission_text = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="venue_progress"><div class="progress progress_sm">' +
              '</div><small></small></td><td>' +
              '</td><td>' +
              '<a href="/venue/'+item.venue_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/venue/'+item.venue_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removevenue" data-id="'+item.venue_id+'" data-toggle="modal" class="btn btn-danger btn-xs venue_delete"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
          permission_text += '<option value="'+item.venue_id+'">'+item.name+'</option>';
        });
        $('#venue_list').html(html_text);
        $('#permission').html(permission_text);
        $('.selectpicker').selectpicker('refresh');
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

user_delete = function(element) {
  $('#removeuserform .form_submit').attr('data-userid', element.dataset.id);
}

user_edit = function(element) {
  $.ajax({
    method: "GET",
    url: "/get_user/"+element.dataset.id,
    /*success: function(data) {
     console.log (data);
     },*/
  })
      .done(function( msg ) {
        $('#edituser #username').val(msg.username);
        $('#edituser #email').val(msg.email);
        $('#edituser #password').val(msg.password);
        $('#edituser #role').val(msg.role);
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
}

$('#removeuserform .form_submit').click(function(){
  var id = $(this).data('userid');
  $.ajax({
    method: "POST",
    url: "/delete_user",
    data: { id: id},
  })
      .done(function( msg ) {
        if (msg.msg == 'success')
          $('#'+id).remove();
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
})

$('.device').click(function (evt) {
  //console.log ('/venue/'+evt.target.dataset.id+'/');
  window.location.href = '/venue/'+evt.target.dataset.id+'/';
})

$(document).ready(function() {
  var campus_id = $('#campus_id').html();
  $.ajax({
    method: "POST",
    url: "/get_venues/"+campus_id,
    //data: { name: name, id: id, description: desc},
  })
      .done(function( msg ) {
        var html_text = '';
        var permission_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="venue_progress"><div class="progress progress_sm">' +
              '</div><small></small></td><td>' +
              '</td><td>' +
              '<a href="/venue/'+item.venue_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/venue/'+item.venue_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removevenue" data-id="'+item.venue_id+'" data-toggle="modal" class="btn btn-danger btn-xs venue_delete"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
          permission_text += '<option value="'+item.venue_id+'">'+item.name+'</option>';
        });
        $('#venue_list').html(html_text);
        $('#adduser #permission').html(permission_text);
        $('#edituser #permission').html(permission_text);
        $('.selectpicker').selectpicker('refresh');
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