var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stall = new Schema({
  id: {type: Number,
    required: [true, 'Stall id field is required']
  },
  name: {
    type: String,
    required: [true, 'Stall name field is required']
  },
  parent_room: {
    type: String,
    required: [true, 'Parent Room id field is required']
  },
  used_today: {type:Number, default:0},
  used_week: {type:Number, default:0},
  used_month:{type:Number, default:0},
  status: String,
  battery: {type:Number, default:100},
  sensor_id: String,
  left: String,
  top: String,
  number_of_changes:{type:Number, default:0},
  vacant_time:{type:Number, default:0},
  busy_time:{type:Number, default:0}, 
  avg_vacant_time:{type:Number, default:0},
  avg_busy_time:{type:Number, default:0},  
  modified_time: {type:Date, default:Date.now },
  long_use:{type:Number, default:0},
  handicap: {type: Number, default: 0}
});

module.exports = mongoose.model('stalls', Stall);
