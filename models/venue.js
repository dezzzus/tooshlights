var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
  name: {
    type: String,
    required: [true, 'Venue name field is required']
  },
  venue_id: {
    type: String,
    required: [true, 'Venue Identifier field is required']
  },
  parent_campus: {
    type: String,
    required: [true, 'Parent campus id field is required']
  },
  created: {
    type: Date,
    required: [true, 'Created field is required']
  },
  id: {type: Number,
    required: [true, 'Venue sequence id field is required']
  },
  updated: Date,
  description: String,
  left: String,
  top: String,
  size: Number,
  notify_option: {type: Object}
});

module.exports = mongoose.model('venues', Venue);