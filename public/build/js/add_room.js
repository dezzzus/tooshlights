var stalls = [];
var stall_newno = 1;
$(document).ready(function() {
  $('#mapwidth').on('change', function(){
    $('.room_device_list').width($('#mapwidth').val());
  });
  $('#mapheight').on('change', function(){
    $('.room_device_list').height($('#mapheight').val());
  });
  $('#room_map_file').on('change', function() {
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
          /*success: function(data) {
           console.log (data);
           },*/
        })
            .done(function( msg ) {
              var html ='<img style="display:none">';
              $('.room_device_list').html(html);
              $('.room_device_list img').attr('src', msg.filename);
              $('.room_device_list').css('background-image', 'url("'+msg.filename+'")');
              $('.room_device_list').css('margin', '15px');
              var img = new Image();
              img.onload = function () {
                $('#mapwidth').val(this.width);
                $('#mapheight').val(this.height);

                $('.room_device_list').width(this.width);
                $('.room_device_list').height(this.height);
                //alert("width : "+this.width + " and height : " + this.height);
              };
              img.src = msg.filename;

              stalls = [];
              stall_newno = 1;
              $('#stall_id').val(stall_newno);
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
              console.log (jqXHR);
              console.log (textStatus);
            });
        //loop for each file selected for uploaded.
        /*for (var i = 0; i < countFiles; i++)
        {
          var reader = new FileReader();
          reader.onload = function(e) {
            $('.room_device_list img').attr("src", e.target.result);
            $('.room_device_list').css('background-image', e.target.result);
          }
          //reader.readAsDataURL($(this)[0].files[i]);
        }*/
      } else {
        alert('This browser does not support FileReader.');
      }
    } else {
      alert('Please select only images');
    }
  });

  $('#add_stall').click(function(){
    var stallname = $('#stall_name').val();
    var sensorid = $('#stall_sensorid').val();
    var html = '<div class="device" id="'+stallname+'" data-id="'+sensorid+'" data-no="'+stall_newno+'"> \
        <div class="dev_status" style="color: rgb(239,129,129);border-color: rgb(239,129,129); box-shadow: 1px 1px 5px 3px #bbbcbc;">'+
        stall_newno+'</div></div>';
    if (stall_newno > 1)
      $('.device').last().after(html);
    else
      $('.room_device_list img').after(html);
    stall_newno++;
    $('#stall_name').val('');
    $('#stall_sensorid').val('');
    $('#stall_id').val(stall_newno);

    $( '.device' ).draggable();
  });

  /*$('.dev_status').click(function(evt){
    console.log(evt.target);
  });

  $('.device').click(function(evt){
    console.log(evt.target);
  });*/
  $('#addroomform').submit(function(evt) {
    evt.preventDefault();
    var stalls = [];
    var room = {
      map_file : $('.room_device_list img').attr('src'),
      room_id : $('#roomid').val(),
      room_type : $('#room_type').val(),
      name : $('#room_name').val(),
      description : $('#description').val(),
      total_stalls : $('#total_stalls').val(),
      available_stalls : $('#available_stalls').val(),
      available_percent : $('#available_percent').val(),
      needs_attention : $('#needsattention').val(),
      parent_floor : $('#floor_id').val(),
      map_width : $('#mapwidth').val(),
      map_height : $('#mapheight').val(),
      avg_vacant_time : 0
    };
    var tmp, i;
    var devices = $('.device');

    for (i=0; i < devices.length; i++ ){
      tmp = {
        name: $(devices[i]).attr('id'),
        parent_room: room.room_id,
        sensor_id: $(devices[i]).attr('data-id'),
        id: $(devices[i]).attr('data-no'),
        left: devices[i].style.left,
        top: devices[i].style.top,
      }
      stalls.push(tmp);
    }
    $.ajax({
      method: "POST",
      url: "/api/add_room",
      data: { room: room, stalls: stalls},
      /*success: function(data) {
       console.log (data);
       },*/
    })
        .done(function( msg ) {
          window.location.href = '/room/'+room.room_id+'/';
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
          console.log (jqXHR);
          console.log (textStatus);
        });
  });
});