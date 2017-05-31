const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors');

var busSchema = new mongoose.Schema({
  busId: {
    type: Number,
    unique: true,
    required: true,
  },
  arName: {
    type: String,
    required: true
  },
  enName: {
    type: String,
    required: true,
    defautl: ' ',
  },
  lenght: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('bus', busSchema, 'bus');