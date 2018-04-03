`use strict`;


const RoomPlot = (($)=>{

  class RoomPlot {
    static getDayUsageData(roomId, callback) {

      $.get('/api/get_room_plot', {
        roomId
      } ).done(data => {
        callback(data);
      });
    }

    static initChart(id, data) {
      var ctx = document.getElementById(id).getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        fill: true,
        data: {
          datasets: [{
            label: "# of Uses",
            data: data,
            borderColor: "rgb(120, 255, 59)",
            backgroundColor: "rgba(120, 255, 59, .4)"
          }]
        },
        options: {
          tooltips: {
            enabled : true,
          },
            maintainAspectRatio : false,
          spanGaps: false,
          elements: {
            line: {
              tension: 0
            }
          },

          scales: {
            xAxes: [{
              type: 'time',
              time: {
                format: 'D hh',
                tooltipFormat: 'll HH:mm'
                // displayFormats: {
                //   hour: 'DD H'
                // }
              },


            }],
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              scaleLabel: {
                display: true,
                labelString: 'Number of Uses',
                fontSize: 24,
              }
            }]
          }
        }
      });
    }
  }

  return RoomPlot;
})(jQuery);




