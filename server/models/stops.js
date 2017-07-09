const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors');
const models = require('../models/busStop');
const constants = require('../utils/constansts');
// var ObjectId = mongoose.Schema.Types.ObjectId;

var stopsSchema = new mongoose.Schema({
  stopId: {
    type: Number,
    unique: true,
    required: true
  },
  arName: {
    type: String,
    required: true
  },
  enName: {
    type: String
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  order:{
    type: Number,
    default: 1
  }
});

stopsSchema.statics.updateStops = function (stops, busId) {
  if(!stops || !stops.length)
    return Promise.reject(errors.missingData);
  var promises = [];
  var thisModel = this;
  stops.forEach(function(stop){
    var id = mongoose.Types.ObjectId(stop.id);
    promises.push(thisModel.update({_id: id}, {order: stop.order, lat: stop.lat, lng: stop.lng}));
  });
  return Promise.all(promises).then(function(){
    return models.find({bus: busId})
      .populate('stop', constants.stop.defautlFields)
      .then(function (stops) {
        return stops;
      });
  });
}

module.exports = mongoose.model('stop', stopsSchema, 'stop');