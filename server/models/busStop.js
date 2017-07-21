const mongoose = require('mongoose');
const constants = require('../utils/constansts')

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
  },
  order: {
    type: Number,
    default: 1
  }
});

busStopSchema.statics.AllStopByBusId = function (busId) {
  var thisModel = this;
  if(!busId || busId == '')
    return Promise.reject();
  return thisModel.find({bus: busId})
    .populate('stop', constants.stop.defautlFields)
    .then(function (stops) {
      return stops;
    })
}

module.exports = mongoose.model('busStop', busStopSchema, 'busStop');
