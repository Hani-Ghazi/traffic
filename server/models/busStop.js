const mongoose = require('mongoose');

var busStopSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'bus'
  },
  stopId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'bus'
  }
});

module.exports = mongoose.model('busStop', busStopSchema, 'busStop');
