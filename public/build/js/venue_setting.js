var notify_option = {};
var venue_id;
$(document).ready(function() {
  $('#brightness').slider({
    formatter: function(value) {
      return 'Brightness ' + value + '%';
    }
  });

  $( "#brightness" ).change(function() {
    $('#brightness_val').html($('#brightness').attr('value')+'%');
  });

  // iCheck
  /*if ($("input.flat")[0]) {
    $(document).ready(function () {
      $('input.flat').iCheck({
        checkboxClass: 'icheckbox_flat-pink',
        radioClass: 'iradio_flat-pink'
      });
    });
  }*/
  // iCheck

  $('#battery_low_threshold').slider({
    formatter: function(value) {
      return 'Battery Low Threshold ' + value + '%';
    }
  });

  $( "#battery_low_threshold" ).change(function() {
    $('#battery_low_threshold_val').html($('#battery_low_threshold').attr('value')+'%');
  });

  $('.womentab-view #stall_turnover_threshold').slider({
    formatter: function(value) {
      return 'Stall TurnOver Threshold ' + value + '%';
    }
  });

  $( ".womentab-view #stall_turnover_threshold" ).change(function() {
    $('.womentab-view #stall_turnover_threshold_val').html($('.womentab-view #stall_turnover_threshold').attr('value')+'%');
  });

  $('.womentab-view #stall_times_threshold').slider({
    formatter: function(value) {
      return 'Stall Threshold Times' + value + '%';
    }
  });

  $( ".womentab-view #stall_times_threshold" ).change(function() {
    $('.womentab-view #stall_times_threshold_val').html($('.womentab-view #stall_times_threshold').attr('value'));
  });

  $('.womentab-view #acute_maintenancethreshold').slider({
    formatter: function(value) {
      return 'Stall Threshold Times' + value + '%';
    }
  });

  $( ".womentab-view #acute_maintenancethreshold" ).change(function() {
    $('.womentab-view #acute_maintenance_threshold_val').html($('.womentab-view #acute_maintenancethreshold').attr('value'));
  });

  $('.mentab-view #stall_turnover_threshold').slider({
    formatter: function(value) {
      return 'Stall TurnOver Threshold ' + value + '%';
    }
  });

  $( ".mentab-view #stall_turnover_threshold" ).change(function() {
    $('.mentab-view #stall_turnover_threshold_val').html($('.mentab-view #stall_turnover_threshold').attr('value')+'%');
  });

  $('.mentab-view #stall_times_threshold').slider({
    formatter: function(value) {
      return 'Stall Threshold Times' + value + '%';
    }
  });

  $( ".mentab-view #stall_times_threshold" ).change(function() {
    $('.mentab-view #stall_times_threshold_val').html($('.mentab-view #stall_times_threshold').attr('value'));
  });

  $('.mentab-view #acute_maintenancethreshold').slider({
    formatter: function(value) {
      return 'Stall Threshold Times' + value + '%';
    }
  });

  $( ".mentab-view #acute_maintenancethreshold" ).change(function() {
    $('.mentab-view #acute_maintenance_threshold_val').html($('.mentab-view #acute_maintenancethreshold').attr('value'));
  });


  $('.unisextab-view #stall_turnover_threshold').slider({
    formatter: function(value) {
      return 'Stall TurnOver Threshold ' + value + '%';
    }
  });

  $( ".unisextab-view #stall_turnover_threshold" ).change(function() {
    $('.unisextab-view #stall_turnover_threshold_val').html($('.unisextab-view #stall_turnover_threshold').attr('value')+'%');
  });

  $('.unisextab-view #stall_times_threshold').slider({
    formatter: function(value) {
      return 'Stall Threshold Times' + value + '%';
    }
  });

  $( ".unisextab-view #stall_times_threshold" ).change(function() {
    $('.unisextab-view #stall_times_threshold_val').html($('.unisextab-view #stall_times_threshold').attr('value'));
  });

  $('.unisextab-view #acute_maintenancethreshold').slider({
    formatter: function(value) {
      return 'Stall Threshold Times' + value + '%';
    }
  });

  $( ".unisextab-view #acute_maintenancethreshold" ).change(function() {
    $('.unisextab-view #acute_maintenance_threshold_val').html($('.unisextab-view #acute_maintenancethreshold').attr('value'));
  });

  venue_id = $('#venue_id').val();
  if ($('#venue_notify_option').val()) {
    notify_option = JSON.parse($('#venue_notify_option').val());
  } else {
    notify_option = {
      brightness: 0,
      vacant_col : '#81EF90',
      occupied_col : '#ff0000',
      vacant_handicap : '#0000ff',
      low_battery: {
        threshold: 0,
        bEmail: true,
        bDashboard: true
      },
      women_floor: {
        maintenance: {
          stalls_turnover: 0,
          stalls_turnover_time: 0,
          bEmail: true,
          bDashboard: true
        },
        acute_maintenance: {
          acute_maintenance: 0,
          bEmail: true,
          bDashboard: true
        }
      },
      men_floor: {
        maintenance: {
          stalls_turnover: 0,
          stalls_turnover_time: 0,
          bEmail: true,
          bDashboard: true
        },
        acute_maintenance: {
          acute_maintenance: 0,
          bEmail: true,
          bDashboard: true
        }
      },
      unisex_floor: {
        maintenance: {
          stalls_turnover: 0,
          stalls_turnover_time: 0,
          bEmail: true,
          bDashboard: true
        },
        acute_maintenance: {
          acute_maintenance: 0,
          bEmail: true,
          bDashboard: true
        }
      },
    };
  }
  console.log (notify_option);

  $("#brightness").slider('setValue', notify_option.brightness, true);
  $('#vacant_col').attr('fill', notify_option.vacant_col);
  $('#occupied_col').attr('fill', notify_option.occupied_col );
  $('#vacant_handicap').attr('fill', notify_option.vacant_handicap );
  $('#low_battery_enabled').prop('checked', notify_option.low_battery.enabled === 'true');
  $('#battery_low_threshold').slider('setValue', notify_option.low_battery.threshold, true);
  $('#battery_low_row .viaEmail').prop('checked', notify_option.low_battery.bEmail === 'true');
  $('#battery_low_row .viaDashboard').prop('checked', notify_option.low_battery.bDashboard === 'true');

  $('.womentab-view .main_enablecheck').prop('checked', notify_option.women_floor.maintenance.enabled === 'true');
  $('.womentab-view #stall_turnover_threshold').slider('setValue', notify_option.women_floor.maintenance.stalls_turnover, true);
  $('.womentab-view #stall_times_threshold').slider('setValue', notify_option.women_floor.maintenance.stalls_turnover_time, true);
  $('.womentab-view .mainviaEmail').prop('checked',  notify_option.women_floor.maintenance.bEmail === 'true');
  $('.womentab-view .mainviaDashboard').prop('checked', notify_option.women_floor.maintenance.bDashboard === 'true');

  $('.womentab-view .acute_enablecheck').prop('checked', notify_option.women_floor.acute_maintenance.enabled === 'true');
  $('.womentab-view #acute_maintenancethreshold').slider('setValue', notify_option.women_floor.acute_maintenance.acute_maintenance, true);
  $('.womentab-view .viaEmail').prop('checked', notify_option.women_floor.acute_maintenance.bEmail === 'true');
  $('.womentab-view .viaDashboard').prop('checked', notify_option.women_floor.acute_maintenance.bDashboard === 'true');

  $('.mentab-view .main_enablecheck').prop('checked', notify_option.men_floor.maintenance.enabled === 'true');
  $('.mentab-view #stall_turnover_threshold').slider('setValue', notify_option.men_floor.maintenance.stalls_turnover, true);
  $('.mentab-view #stall_times_threshold').slider('setValue', notify_option.men_floor.maintenance.stalls_turnover_time, true);
  $('.mentab-view .mainviaEmail').prop('checked', notify_option.men_floor.maintenance.bEmail === 'true');
  $('.mentab-view .mainviaDashboard').prop('checked', notify_option.men_floor.maintenance.bDashboard === 'true');

  $('.mentab-view .acute_enablecheck').prop('checked', notify_option.men_floor.acute_maintenance.enabled === 'true');
  $('.mentab-view #acute_maintenancethreshold').slider('setValue',notify_option.men_floor.acute_maintenance.acute_maintenance, true);
  $('.mentab-view .viaEmail').prop('checked', notify_option.men_floor.acute_maintenance.bEmail === 'true');
  $('.mentab-view .viaDashboard').prop('checked', notify_option.men_floor.acute_maintenance.bDashboard === 'true');

  $('.unisextab-view .main_enablecheck').prop('checked', notify_option.unisex_floor.maintenance.enabled === 'true');
  $('.unisextab-view #stall_turnover_threshold').slider('setValue', notify_option.unisex_floor.maintenance.stalls_turnover, true);
  $('.unisextab-view #stall_times_threshold').slider('setValue', notify_option.unisex_floor.maintenance.stalls_turnover_time, true);
  $('.unisextab-view .mainviaEmail').prop('checked',  notify_option.unisex_floor.maintenance.bEmail === 'true');
  $('.unisextab-view .mainviaDashboard').prop('checked',  notify_option.unisex_floor.maintenance.bDashboard === 'true');

  $('.unisextab-view .acute_enablecheck').prop('checked', notify_option.unisex_floor.acute_maintenance.enabled === 'true');
  $('.unisextab-view #acute_maintenancethreshold').slider('setValue', notify_option.unisex_floor.acute_maintenance.acute_maintenance, true);
  $('.unisextab-view .viaEmail').prop('checked', notify_option.unisex_floor.acute_maintenance.bEmail === 'true');
  $('.unisextab-view .viaDashboard').prop('checked', notify_option.unisex_floor.acute_maintenance.bDashboard === 'true');

  $('#brightness_val').html($('#brightness').attr('value')+'%');
  $('#battery_low_threshold_val').html($('#battery_low_threshold').attr('value')+'%');
  $('.womentab-view #stall_turnover_threshold_val').html($('.womentab-view #stall_turnover_threshold').attr('value')+'%');
  $('.womentab-view #stall_times_threshold_val').html($('.womentab-view #stall_times_threshold').attr('value'));
  $('.womentab-view #acute_maintenance_threshold_val').html($('.womentab-view #acute_maintenancethreshold').attr('value'));
  $('.mentab-view #stall_turnover_threshold_val').html($('.mentab-view #stall_turnover_threshold').attr('value')+'%');
  $('.mentab-view #stall_times_threshold_val').html($('.mentab-view #stall_times_threshold').attr('value'));
  $('.mentab-view #acute_maintenance_threshold_val').html($('.mentab-view #acute_maintenancethreshold').attr('value'));
  $('.unisextab-view #stall_turnover_threshold_val').html($('.unisextab-view #stall_turnover_threshold').attr('value')+'%');
  $('.unisextab-view #stall_times_threshold_val').html($('.unisextab-view #stall_times_threshold').attr('value'));
  $('.unisextab-view #acute_maintenance_threshold_val').html($('.unisextab-view #acute_maintenancethreshold').attr('value'));

});

$('#womentab').click(function (e) {
  $('.womentab-view').removeClass('hidden-div');
  $('.mentab-view').addClass('hidden-div');
  $('.unisextab-view').addClass('hidden-div');
  $('#womentab').removeClass('inactive-tab');
  $('#womentab').addClass('active-tab');
  $('#mentab').removeClass('active-tab');
  $('#mentab').addClass('inactive-tab');
  $('#unisextab').removeClass('active-tab');
  $('#unisextab').addClass('inactive-tab');

  $('#womentab').html('<img src="/images/settings/women-active.png">');
  $('#mentab').html('<img src="/images/settings/men-inactive.png">');
  $('#unisextab').html('<img src="/images/settings/unisex-inactive.png">');
});

$('#mentab').click(function (e) {
  $('.mentab-view').removeClass('hidden-div');
  $('.womentab-view').addClass('hidden-div');
  $('.unisextab-view').addClass('hidden-div');
  $('#mentab').removeClass('inactive-tab');
  $('#mentab').addClass('active-tab');
  $('#womentab').removeClass('active-tab');
  $('#womentab').addClass('inactive-tab');
  $('#unisextab').removeClass('active-tab');
  $('#unisextab').addClass('inactive-tab');

  $('#womentab').html('<img src="/images/settings/women-inactive.png">');
  $('#mentab').html('<img src="/images/settings/men-active.png">');
  $('#unisextab').html('<img src="/images/settings/unisex-inactive.png">');
});

$('#unisextab').click(function (e) {
  $('.unisextab-view').removeClass('hidden-div');
  $('.womentab-view').addClass('hidden-div');
  $('.mentab-view').addClass('hidden-div');
  $('#unisextab').removeClass('inactive-tab');
  $('#unisextab').addClass('active-tab');
  $('#womentab').removeClass('active-tab');
  $('#womentab').addClass('inactive-tab');
  $('#mentab').removeClass('active-tab');
  $('#mentab').addClass('inactive-tab');

  $('#womentab').html('<img src="/images/settings/women-inactive.png">');
  $('#mentab').html('<img src="/images/settings/men-inactive.png">');
  $('#unisextab').html('<img src="/images/settings/unisex-active.png">');
});


$('#save-setting').click(function () {
  notify_option = {
    brightness: $('#brightness').val(),
    vacant_col : $('#vacant_col').attr('fill'),
    occupied_col : $('#occupied_col').attr('fill'),
    vacant_handicap : $('#vacant_handicap').attr('fill'),
    low_battery: {
      enabled: $('#low_battery_enabled').is(':checked'),
      threshold: $('#battery_low_threshold').val(),
      bEmail: $('#battery_low_row .viaEmail').is(':checked'),
      bDashboard: $('#battery_low_row .viaDashboard').is(':checked')
    },
    women_floor: {
      maintenance: {
        enabled: $('.womentab-view .main_enablecheck').is(':checked'),
        stalls_turnover: $('.womentab-view #stall_turnover_threshold').val(),
        stalls_turnover_time: $('.womentab-view #stall_times_threshold').val(),
        bEmail: $('.womentab-view .mainviaEmail').is(':checked'),
        bDashboard: $('.womentab-view .mainviaDashboard').is(':checked')
      },
      acute_maintenance: {
        enabled: $('.womentab-view .acute_enablecheck').is(':checked'),
        acute_maintenance: $('.womentab-view #acute_maintenancethreshold').val(),
        bEmail: $('.womentab-view .viaEmail').is(':checked'),
        bDashboard: $('.womentab-view .viaDashboard').is(':checked')
      }
    },
    men_floor: {
      maintenance: {
        enabled: $('.mentab-view .main_enablecheck').is(':checked'),
        stalls_turnover: $('.mentab-view #stall_turnover_threshold').val(),
        stalls_turnover_time: $('.mentab-view #stall_times_threshold').val(),
        bEmail: $('.mentab-view .mainviaEmail').is(':checked'),
        bDashboard: $('.mentab-view .mainviaDashboard').is(':checked')
      },
      acute_maintenance: {
        enabled: $('.mentab-view .acute_enablecheck').is(':checked'),
        acute_maintenance: $('.mentab-view #acute_maintenancethreshold').val(),
        bEmail: $('.mentab-view .viaEmail').is(':checked'),
        bDashboard: $('.mentab-view .viaDashboard').is(':checked')
      }
    },
    unisex_floor: {
      maintenance: {
        enabled: $('.mentab-view .main_enablecheck').is(':checked'),
        stalls_turnover: $('.mentab-view #stall_turnover_threshold').val(),
        stalls_turnover_time: $('.mentab-view #stall_times_threshold').val(),
        bEmail: $('.unisextab-view .mainviaEmail').is(':checked'),
        bDashboard: $('.unisextab-view .mainviaDashboard').is(':checked')
      },
      acute_maintenance: {
        enabled: $('.unisextab-view .acute_enablecheck').is(':checked'),
        acute_maintenance: $('.mentab-view #acute_maintenancethreshold').val(),
        bEmail: $('.unisextab-view .viaEmail').is(':checked'),
        bDashboard: $('.unisextab-view .viaDashboard').is(':checked')
      }
    },
  };

  $.ajax({
    method: "POST",
    url: "/api/venue/setting",
    data: { venue_id: venue_id, setting: {notify_option: notify_option}},
  })
      .done(function( msg ) {
        window.location.href = '/venue/'+venue_id+'/setting';
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log (jqXHR);
        console.log (textStatus);
      });
})