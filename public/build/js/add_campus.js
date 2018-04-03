var venues = [];
var venue_newno = 1;
var selected_venue = null;
$(document).ready(function() {
  $('#mapwidth').on('change', function(){
    $('.campus_device_list').width($('#mapwidth').val());
  });
  $('#mapheight').on('change', function(){
    $('.campus_device_list').height($('#mapheight').val());
  });
  $('#campus_map_file').on('change', function() {
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
              $('.campus_device_list').html(html);
              $('.campus_device_list img').attr('src', msg.filename);
              $('.campus_device_list').css('background-image', 'url("'+msg.filename+'")');
              $('.campus_device_list').css('margin', '15px');
              $('.campus_device_list').css('background-size', 'contain');
              var img = new Image();
              img.onload = function () {
                $('#mapwidth').val(this.width);
                $('#mapheight').val(this.height);

                $('.campus_device_list').width(this.width);
                $('.campus_device_list').height(this.height);
                //alert("width : "+this.width + " and height : " + this.height);
              };
              img.src = msg.filename;

              venues = [];
              venue_newno = 1;
              $('#venue_id').val(venue_newno);
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

  $('#add_venue').click(function(){
    var venuename = $('#venue_name').val();
    var sensorid = $('#venue_sensorid').val();
    var desc = $('#venue_description').val();
    var size = $('#venue_size').val();
    var venueno = $('#venue_id').val();
    if (selected_venue) {
      selected_venue.attr('id', venuename);
      selected_venue.attr('data-id', sensorid);
      selected_venue.attr('data-desc', desc);
      selected_venue.attr('data-size', size);
      selected_venue.attr('data-no', venueno);
      selected_venue.find('.dev_status').width(size);
      selected_venue.find('.dev_status').height(size);
    } else {
      var html = '<div class="device" id="' + venuename + '" data-id="' + sensorid + '" data-desc="' + desc + '" data-size="' + size + '" data-no="' + venue_newno + '"> \
        <div class="dev_status" style="color: rgb(239,129,129);border-color: rgb(239,129,129); box-shadow: 1px 1px 5px 3px #bbbcbc;width:' + size + 'px;height:' + size + 'px;">' +
          venue_newno + '</div></div>';
      if (venue_newno > 1)
        $('.device').last().after(html);
      else
        $('.campus_device_list img').after(html);
      venue_newno++;
      $('#venue_name').val('');
      $('#venue_sensorid').val('');
      $('#venue_description').val('');
      $('#venue_size').val('200');
      $('#venue_id').val(venue_newno);
    }

    $( '.device' ).draggable({
      start: function(event, ui) {
        selected_venue = $(event.target);
        $('#venue_id').val(selected_venue.attr('data-no'));
        $('#venue_name').val(selected_venue.attr('id'));
        $('#venue_sensorid').val(selected_venue.attr('data-id'));
        $('#venue_description').val(selected_venue.attr('data-desc'));
        $('#venue_size').val(selected_venue.attr('data-size'));
        $('#add_venue').html('Change');
      }
    });
  });

  $('#campus_submit').click(function(evt) {
    evt.preventDefault();
    var venues = [];
    var campus = {
      map_file : $('.campus_device_list img').attr('src'),
      campus_id : $('#campusid').val(),
      name : $('#campus_name').val(),
      description : $('#description').val(),
      map_width : $('#mapwidth').val(),
      map_height : $('#mapheight').val()
    };
    var tmp, i;
    var devices = $('.device');

    for (i=0; i < devices.length; i++ ){
      tmp = {
        name: $(devices[i]).attr('id'),
        parent_campus: campus.campus_id,
        venue_id: $(devices[i]).attr('data-id'),
        id: $(devices[i]).attr('data-no'),
        description: $(devices[i]).attr('data-desc'),
        left: devices[i].style.left,
        top: devices[i].style.top,
        size: $(devices[i]).attr('data-size'),
      }
      venues.push(tmp);
    }
    $.ajax({
      method: "POST",
      url: "/api/add_campus",
      data: { campus: campus, venues: venues},
    })
        .done(function( msg ) {
          window.location.href = '/campus/'+campus.campus_id+'/';
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
          console.log (jqXHR);
          console.log (textStatus);
        });
  });

  $('#formcancel').click(function(){
    window.location.href= '/dashboard/admin';
  })

  $('#venue_reset').click(function () {
    $('#venue_part input').val('');
    $('#venue_id').val(venue_newno);
    selected_venue = null;
    $('#add_venue').html('Add');
  })

});