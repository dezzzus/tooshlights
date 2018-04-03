var config = require('../models/account');
var Campus = require('../models/campus');
var Venue = require('../models/venue');
var Floor = require('../models/floor');
var Room = require('../models/room');
var Stall = require('../models/stall');
var Event = require('../models/event');
var Notification = require('./notification');


module.exports = {
  detect: function () {
  	//console.log("detect function");
             //Update stall state and send notifications...
     Venue.find({},function(err,venue_settings){
     	var length = venue_settings.length;
     	for(var i =0; i<length; i++){
     		venue_setting = venue_settings[i];
     		//console.log("venue setting",venue_settings);
              try{
                var batterysetting = venue_setting.notify_option.low_battery;
                var mansetting =venue_setting.notify_option.women_floor;   
                 //console.log("venue setting", mansetting,batterysetting);
               //  console.log("entry status", ent);          
                if(batterysetting.enabled=="true" && ent.battery<batterysetting.threshold){
                  if(batterysetting.bEmail=="true"){
                    Notification.sendemail('andrew.li1987@yandex.com','andrew.lidev@yandex.com','Hello', 'This is the first');                    
                  }
                  if(batterysetting.bDashboard=="true"){
                    console.log("battery update", ent);   
                    Notification.sendnotification("battery_updated",ent, io);
                  }
                }
                if(mansetting.maintenance.enabled=="true"){
                  var stalls_turnover= mansetting.maintenance.stalls_turnover;
                  var stalls_turnover_time=mansetting.maintenance.stalls_turnover_time;
                  Stall.aggregate([{$match:{parent_room:ent.parent_room}},{$group:{_id:null,count:{$sum:1}}}], function(err, totals){
                    console.log("total:", totals);
                    var total = totals.count;
                    Stall.aggregate([{$match:{parent_room:ent.parent_room,used_today:{$gt:stalls_turnover_time}}},{$group:{_id : null , count: {$sum: 1}}}],function(err, settingstalls){
                      var total_used_count = settingstalls.count;
                      console.log("settingstalls:", settingstalls);
                      if(Math.round(total_used_count/total*100)>stalls_turnover_time){
                        console.log("Over time:");
                        if(mansetting.maintenance.bEmail=="true"){
                          Notification.sendemail('andrew.li1987@yandex.com','andrew.lidev@yandex.com','Hello', 'This is the first');                    
                        }
                        if(mansetting.maintenance.bDashboard=="true"){
                          var msg = stalls_turnover+" of room has turned over "+stalls_turnover_time;
                          Notification.sendnotification("restroom_notification", msg, io);
                        }                        
                      }
                    });
                  });
                  if(mansetting.acute_maintenance.enabled=="true"){
                    //console.log("Acute maintenance:",mansetting.acute_maintenance);
                    var acute_maintenance = mansetting.acute_maintenance.acute_maintenance;
                    if(ent.used_today>acute_maintenance){
                      if(mansetting.maintenance.bEmail=="true"){
                        Notification.sendemail('andrew.li1987@yandex.com','andrew.lidev@yandex.com','Hello', 'This is the first');                    
                      }
                      if(mansetting.maintenance.bDashboard=="true"){
                        var msg = "The stall turn over "+acute_maintenance;
                        Notification.sendnotification("restroom_notification", msg, io);
                      }                        
                    }                    
                  }
                }
              }catch(e){

              }

          }



             });

  	setTimeout(this.detect.bind(this), 3000);
  },
};
