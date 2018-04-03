$(document).ready(function() {
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
          item_html = '<div class="row" style="margin-top:30px;"><div class="col-md-6"><b>'+ item.username +'</b><br/>'+item.email+'</div><div class="col-md-6"><div style="display: inline-block">';
          console.log (item);
          if (item.apiaccess) {
            item.apiaccess.split(',').forEach(function (venue) {
              console.log (venue);
              item_html += venue + '<br/>';
            });
          }
          item_html += '</div><a href="/dashboard/apiaccess/'+item.username+'" class="btn btn-danger" style="float:right;background-color: rgb(237,78,39);font-weight: bold;">manage <br/>access</a></div></div>';
          html_text += item_html;
        });
        $('#user_table').html(html_text);
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