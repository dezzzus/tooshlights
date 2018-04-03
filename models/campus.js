var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Campus = new Schema({
  name: {
    type: String,
    required: [true, 'Campus name field is required']
  },
  campus_id: {
    type: String,
    required: [true, 'Campus Identifier field is required']
  },
  created: {
    type: Date,
    required: [true, 'Created field is required']
  },
  updated: Date,
  map_file: String,
  description: String,
  map_width: Number,
  map_height: Number
});

module.exports = mongoose.model('campuses', Campus);