var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
  name: {
    type: String,
    required: [true, 'Room name field is required']
  },
  parent_floor: {
    type: String,
    required: [true, 'Parent Floor id field is required']
  },
  id: Number, //room number
  room_id: {
    type: String,
        required: [true, 'Room Identifier field is required']
  },
  created: {
    type: Date,
    required: [true, 'Created field is required']
  },
  description: String,
  room_type: String,
  map_file: String,
  map_width: Number,
  map_height: Number,
  left: String,
  top: String,
  size: String,
});

module.exports = mongoose.model('rooms', Room);