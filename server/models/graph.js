const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors');
var gm = require('googlemaps');

var graphSchema = new mongoose.Schema({
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'stop'
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'stop'
  },
  distance: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    default: 'WALKING',
    enum: ['WALKING', 'DRIVEING']
  },
  isDriect: {
    type: Boolean
  }
});




module.exports = mongoose.model('graph', graphSchema, 'graph');