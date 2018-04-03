$('#addcampusform .form_submit').click(function () {
  var name = $('#addcampusform #name').val();
  var id = $('#addcampusform #campusid').val();
  var desc = $('#addcampusform #description').val();
  $.ajax({
    method: "POST",
    url: "/add_campus",
    data: { name: name, campusid: id, description: desc},
    /*success: function(data) {
     console.log (data);
     },*/
  })
      .done(function( msg ) {
        var html_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="campus_progress"><div class="progress progress_sm">' +
              '</div><small></small></td><td>' +
              '</td><td>' +
              '<a href="/campus/'+item.campus_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/campus/'+item.campus_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#" data-id="'+item.campus_id+'" class="btn btn-danger btn-xs campus_delete"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
        });
        $('#campus_list').html(html_text);
        // Progressbar
        if ($(".progress .progress-bar")[0]) {
          $('.progress .progress-bar').progressbar();
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
  $('#addcampusform input').val('');
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

campus_delete = function(element) {
  $('#removecampusform .form_submit').attr('data-campusid', element.dataset.id);
}

$('#removecampusform .form_submit').click(function(){
  var id = $(this).data('campusid');
  $.ajax({
    method: "POST",
    url: "/delete_campus",
    data: { campusid: id},
  })
      .done(function( msg ) {
        var html_text = '';
        var permission_text = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="campus_progress"><div class="progress progress_sm">' +
              '</div><small></small></td><td>' +
              '</td><td>' +
              '<a href="/campus/'+item.campus_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/campus/'+item.campus_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removecampus" data-id="'+item.campus_id+'" data-toggle="modal" class="btn btn-danger btn-xs campus_delete"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
          permission_text += '<option value="'+item.campus_id+'">'+item.name+'</option>';
        });
        $('#campus_list').html(html_text);
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

$(document).ready(function() {
  $.ajax({
    method: "POST",
    url: "/get_campuses/",
    //data: { name: name, id: id, description: desc},
  })
      .done(function( msg ) {
        var html_text = '';
        var permission_text = '';
        var date_str = '';
        msg.forEach(function(item) {
          html_text += '<tr><td>#</td><td>'+item.name+'<br /><small>Created '+item.created+'</small></td><td class="campus_progress"><div class="progress progress_sm">' +
              '</div><small></small></td><td>' +
              '</td><td>' +
              '<a href="/campus/'+item.campus_id+'/" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
              '<a href="/campus/'+item.campus_id+'/edit" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>' +
              '<a href="#removecampus" data-id="'+item.campus_id+'" data-toggle="modal" class="btn btn-danger btn-xs" onclick="campus_delete(this)"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
          permission_text += '<option value="'+item.campus_id+'">'+item.name+'</option>';
        });
        $('#campus_list').html(html_text);
        $('#adduser #permission').html(permission_text);
        $('#edituser #permission').html(permission_text);
        $('.selectpicker').selectpicker('refresh');
        // Progressbar
        if ($(".progress .progress-bar")[0]) {
          $('.progress .progress-bar').progressbar();
        }
        $.ajax({
          method: "POST",
          url: "/get_users",
          //data: { name: name, id: id, description: desc},
        })
            .done(function( msg1 ) {
              var html_text = '';
              var date_str = '';
              var campuses = '';
              var i = 0;
              msg1.forEach(function(item) {
                campuses = '';
                if (item.permission) {
                  item.permission.split('|').forEach(function (permi) {
                    for (i = 0; i < msg.length; i++) {
                      if (msg[i].campus_id == permi)
                        campuses += '<a href="/campus/' + permi + '/">' + msg[i].name + '</a>, ';
                    }
                  });
                } else if (item.role == 'superAdmin') {
                  for (i = 0; i < msg.length; i++) {
                    campuses += '<a href="/campus/' + msg[i].campus_id + '/">' + msg[i].name + '</a>, ';
                  }
                }

                html_text += '<tr id="'+item._id+'"><td>#</td><td>'+item.username+'<br /><small>Created '+item.created+'</small></td><td class="viewable_campuses">'+campuses+'</td><td>' +
                    '<button type="button" class="btn btn-success btn-xs">'+item.role+'</button></td><td>' +
                    '<a href="#edituser" data-id="'+item._id+'" data-toggle="modal" class="btn btn-info btn-xs" onclick="user_edit(this)"><i class="fa fa-pencil"></i> Edit </a>' +
                    '<a href="#removeuser" data-id="'+item._id+'" data-toggle="modal" class="btn btn-danger btn-xs user_delete" onclick="user_delete(this)"><i class="fa fa-trash-o"></i> Delete </a></td></tr>';
              });
              $('#user_list').html(html_text);
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
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
});