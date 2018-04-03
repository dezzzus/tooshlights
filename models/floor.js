var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Floor = new Schema({
  name: {
    type: String,
    required: [true, 'Floor name field is required']
  },
  parent_venue: {
    type: String,
    required: [true, 'Parent venue id field is required']
  },
  floor_id: {
    type: String,
    required: [true, 'Floor Identifier field is required']
  },
  created: {
    type: Date,
    required: [true, 'Created field is required']
  },
  description: String,
  map_file: String,
  map_width: Number,
  map_height: Number,
  left: String,
  top: String,
  size: String,
});

module.exports = mongoose.model('floors', Floor);