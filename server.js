var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var socket_io = require('socket.io');
var path = require('path');
var config = require('./config');
var socket_proc = require('./connection');
var socket_proc2 = require('./connection2');


var Account = require('./models/account');
var Campus = require('./models/campus');
var Venue = require('./models/venue');
var Floor = require('./models/floor');
var Room = require('./models/room');
var Stall = require('./models/stall');
var Event = require('./models/event');
var Notification = require('./tools/notification');

mongoose.connect(config.mongodb_uri, config.mongoOptions);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log(" db started on : " + config.mongodb_uri);
  /*var obj = new Account({
    username: 'test',
    email: 'test@t.com',
    password: 'admin123'});
  obj.save(function(err, account) {console.log (err); console.log(account);});*/
});

//passport config
var Account = require('./models/account');
var PassportLocalStrategy = require('passport-local');

var authStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  Account.authenticate(username, password, function(error, user){
    // You can write any kind of message you'd like.
    // The message will be displayed on the next page the user visits.
    // We're currently not displaying any success message for logging in.
    done(error, user, error ? { message: error.message } : null);
  });
});

var authSerializer = function(user, done) {
  done(null, user.id);
};

var authDeserializer = function(id, done) {
  Account.findById(id, function(error, user) {
    done(error, user);
  });
};



// Create a new Express application.
var app = express();

// Configure view engine to render HBS templates.
app.engine('.hbs', exphbs({extname: '.hbs', partialsDir: ['views/partials/']}));
app.set('view engine', '.hbs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'venuelink',
  cookie: { secure: false }
}));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'venuelink', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(require('connect-flash')()); // see the next section
app.use(passport.initialize());
app.use(passport.session());

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);


var http_server = app.listen(5000, function () {
  console.log('Server started on port %d', http_server.address().port);
});
var io = socket_io.listen(http_server);
socket_proc(io);

var http_server2 = app.listen(5001, function () {
  console.log('Server started on port %d', http_server2.address().port);
});
var io2 = socket_io.listen(http_server2);
socket_proc2(io2);

require('./route')(app, io);

app.use(function(req, res, next) {
  //console.log ("err : ");
  res.redirect('/');
});


var random = require("random-js")(); // uses the nativeMath engine
var value = random.integer(1, 100);
var mins = 400;
var uses = 14;

function autochange () {

if (mins > 9000) {
  mins = 350;
}
if (uses > 630) {
  uses = 14;
}

  mins = mins + random.integer(1, 7);
  uses = uses + random.integer(0, 1);

  var room = { "name" : "Room_2_1W", "floor" : "Floor 1", "total_stalls" : 8, "available_stalls" : random.integer(1, 7),
    "available_percent" : 1, "avg_vacant_time" : uses, "vacant_time_percent" : random.integer(41, 50),
    "needs_attention" : 0, "available_fromlastweek" : random.integer(10, 15), "room_id" : "room_2_1w"};

    

  room.available_percent = ((room.available_stalls * 100) / 8) ;
  room.available_percent = room.available_percent.toFixed(1);
  io.emit('room_updated', room);

  var room1 = { "name" : "Room_2_1M", "floor" : "Floor 1", "total_stalls" : 144, "available_stalls" : random.integer(70, 105),
    "available_percent" : 1, "avg_vacant_time" : mins, "vacant_time_percent" : random.integer(41, 50),
    "needs_attention" : random.integer(1,5), "available_fromlastweek" : random.integer(10, 15), "room_id" : "room_2_1m"};
  room1.available_percent = room1.available_stalls * 100 / room1.total_stalls ;
  room1.available_percent = room1.available_percent.toFixed(1);
  io.emit('room_updated', room1);

  setTimeout(autochange, 6000);
}

setTimeout(inspect_vene, 3000);

function inspect_vene(){
    //console.log("detect function");
             //Update stall state and send notifications...
     Venue.find({},function(err,venue_settings){
      var length = venue_settings.length;
      for(var i =0; i<length; i++){
        venue_setting = venue_settings[i];
        //console.log("venue setting",venue_settings);
        var mansetting ;
        try{
          mansetting=venue_setting.notify_option.women_floor; 
        }
        catch(e){
          continue;
        }
              try{
                if(mansetting.maintenance.enabled=="true"){
                  var old_time = mansetting.maintenance.senttime ;
                  var date = new Date();
                  var use_time = -1;
                  if(old_time!=null) use_time = Math.round(Math.abs(date.getTime() - oldtime.getTime())/60000);

                  var stalls_turnover= mansetting.maintenance.stalls_turnover;
                  var stalls_turnover_time=mansetting.maintenance.stalls_turnover_time;

                  Room.find({}, function(err, rooms){

                    var count_rooms = rooms.count;
                    for(var i_room =0 ;i_room<count_rooms; i_room++){
                      var room = rooms[i_room];
                    Stall.aggregate([{$match:{parent_room:room.room}},{$group:{_id:null,count:{$sum:1}}}], function(err, totals){
                      console.log("total:", totals);
                      var total = totals.count;
                      Stall.aggregate([{$match:{parent_room:room.room,used_today:{$gt:stalls_turnover_time}}},{$group:{_id : null , count: {$sum: 1}}}],function(err, settingstalls){
                        var total_used_count = settingstalls.count;
                        console.log("settingstalls:", settingstalls);
                        if(Math.round(total_used_count/total*100)>stalls_turnover_time && (use_time==-1 || use_time>stalls_turnover_time)){
                          console.log("Over time:");

                      Venue.findOneAndUpdate({venue_id:venue_setting.venue_id},{$set:{maintenance:{senttime:date}}},{upsert:true,new:true},function(err,ven){

                      });


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
                    }

                  });

                  if(mansetting.acute_maintenance.enabled=="true"){
                    //console.log("Acute maintenance:",mansetting.acute_maintenance);
                  var old_time = mansetting.acute_maintenance.senttime ;
                  var date = new Date();
                  var use_time = -1;
                  if(old_time!=null)  use_time= Math.round(Math.abs(date.getTime() - oldtime.getTime())/60000);
                   

                    var acute_maintenance = mansetting.acute_maintenance.acute_maintenance;
                    Stall.find({long_use:{$gt:acute_maintenance}}, function(err, ents){
                      if(ents.length>0 && (use_time==-1 || use_time>acute_maintenance)){
                      Venue.findOneAndUpdate({venue_id:venue_setting.venue_id},{$set:{acute_maintenance:{senttime:date}}},{upsert:true,new:true},function(err,ven){

                      });                       
                        if(mansetting.maintenance.bEmail=="true"){
                          Notification.sendemail('andrew.li1987@yandex.com','andrew.lidev@yandex.com','Hello', 'This is the first');                    
                        }
                        if(mansetting.maintenance.bDashboard=="true"){
                          var msg = "The stall turn over "+acute_maintenance;
                          Notification.sendnotification("restroom_notification", msg, io);
                        }                         
                      }

                    });                   
                  }
                }
              }catch(e){

              }

          }



             });

    setTimeout(inspect_vene.bind(this), 3000);
  }

