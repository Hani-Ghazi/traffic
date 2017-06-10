const mongoose = require('mongoose');

var busStopSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'bus'
  },
  stop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'stop'
  }
});

module.exports = mongoose.model('busStop', busStopSchema, 'busStop');
