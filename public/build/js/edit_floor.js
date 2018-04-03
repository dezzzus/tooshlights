var rooms = [];
var old_rooms = [];
var room_newno = 1;
var selected_room = null;

$(document).ready(function() {
  $('#mapwidth').on('change', function(){
    $('.floor_device_list').width($('#mapwidth').val());
  });
  $('#mapheight').on('change', function(){
    $('.floor_device_list').height($('#mapheight').val());
  });
  $('#floor_map_file').on('change', function() {
    //Get count of selected files
    var countFiles = $(this)[0].files.length;
    var imgPath = $(this)[0].value;
    var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
    if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
      if (typeof(FileReader) != "undefined") {
        var data = new FormData();
        data.append('file', $(this)[0].files[0], $(this)[0].files[0].name);
        $.ajax({
          method: "POST",
          url: "/api/tmpmap_upload",
          cache: false,
          contentType: false,
          processData: false,
          data: data,
        })
          .done(function( msg ) {
            var html ='<img style="display:none">';
            $('.floor_device_list').html(html);
            $('.floor_device_list img').attr('src', msg.filename);
            $('.floor_device_list').css('background-image', 'url("'+msg.filename+'")');
            $('.floor_device_list').css('margin', '15px');
            $('.floor_device_list').css('background-size', 'contain');
            var img = new Image();
            img.onload = function () {
              $('#mapwidth').val(this.width);
              $('#mapheight').val(this.height);

              $('.floor_device_list').width(this.width);
              $('.floor_device_list').height(this.height);
              //alert("width : "+this.width + " and height : " + this.height);
            };
            img.src = msg.filename;

            rooms = [];
            room_newno = 1;
            $('#room_id').val(room_newno);
          })
          .fail(function( jqXHR, textStatus, errorThrown ) {
            console.log (jqXHR);
            console.log (textStatus);
          });
      } else {
        alert('This browser does not support FileReader.');
      }
    } else {
      alert('Please select only images');
    }
  });

  $('#add_room').click(function(){
    var roomname = $('#room_name').val();
    var sensorid = $('#room_sensorid').val();
    var desc = $('#room_description').val();
    var size = $('#room_size').val();
    var roomno = $('#room_id').val();
    if (selected_room) {
      selected_room.attr('id', roomname);
      selected_room.attr('data-id', sensorid);
      selected_room.attr('data-desc', desc);
      selected_room.attr('data-size', size);
      selected_room.attr('data-no', roomno);
      selected_room.find('.dev_status').width(size);
      selected_room.find('.dev_status').height(size);
    } else {
      var html = '<div class="device" id="' + roomname + '" data-bnew="1" data-id="' + sensorid + '" data-desc="' + desc + '" data-size="' + size + '" data-no="' + room_newno + '"> \
        <div class="dev_status" style="color: rgb(239,129,129);border-color: rgb(239,129,129); box-shadow: 1px 1px 5px 3px #bbbcbc;width:' + size + 'px;height:' + size + 'px;">' +
        room_newno + '</div></div>';
      if (room_newno > 1)
        $('.device').last().after(html);
      else
        $('.floor_device_list img').after(html);
      room_newno++;
      $('#room_name').val('');
      $('#room_sensorid').val('');
      $('#room_description').val('');
      $('#room_size').val('200');
      $('#room_id').val(room_newno);
    }

    $( '.device' ).draggable({
      start: function(event, ui) {
        selected_room = $(event.target);
        $('#room_id').val(selected_room.attr('data-no'));
        $('#room_name').val(selected_room.attr('id'));
        $('#room_sensorid').val(selected_room.attr('data-id'));
        $('#room_description').val(selected_room.attr('data-desc'));
        $('#room_size').val(selected_room.attr('data-size'));
        $('#add_room').html('Change');
      }
    });
  });

  $('#floor_submit').click(function(evt) {
    evt.preventDefault();
    var rooms = [];
    var floor = {
      map_file : $('.floor_device_list img').attr('src'),
      floor_id : $('#floorid').val(),
      name : $('#floor_name').val(),
      description : $('#description').val(),
      old_floor_id: $('#oldfloor_id').val(),
      map_width : $('#mapwidth').val(),
      map_height : $('#mapheight').val()
    };
    var tmp, i;
    var devices = $('.device');

    for (i=0; i < devices.length; i++ ){
      tmp = {
        name: $(devices[i]).attr('id'),
        parent_floor: floor.floor_id,
        room_id: $(devices[i]).attr('data-id'),
        id: $(devices[i]).attr('data-no'),
        description: $(devices[i]).attr('data-desc'),
        left: devices[i].style.left,
        top: devices[i].style.top,
        size: $(devices[i]).attr('data-size'),
        old_room_id: old_rooms[$(devices[i]).attr('data-no')]
      }
      rooms.push(tmp);
    }
    $.ajax({
      method: "POST",
      url: "/api/update_floor",
      data: { floor: floor, rooms: rooms},
    })
      .done(function( msg ) {
        window.location.href = '/floor_map/'+floor.floor_id+'/';
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
  });

  $('#formcancel').click(function(){
    window.location.href= '/dashboard/admin';
  })

  $('#room_reset').click(function () {
    $('#room_part input').val('');
    $('#room_id').val(room_newno);
    selected_room = null;
    $('#add_room').html('Add');
  })

  $( '.device' ).draggable({
    start: function(event, ui) {
      selected_room = $(event.target);
      $('#room_id').val(selected_room.attr('data-no'));
      $('#room_name').val(selected_room.attr('id'));
      $('#room_sensorid').val(selected_room.attr('data-id'));
      $('#room_description').val(selected_room.attr('data-desc'));
      $('#room_size').val(selected_room.attr('data-size'));
      $('#add_room').html('Change');
    }
  });

  room_newno = $('#oldnew_no').val();
  var devices = $('.device');

  for (i=0; i < devices.length; i++ ){
    old_rooms[$(devices[i]).attr('data-no')] = $(devices[i]).attr('data-id');
  }
});