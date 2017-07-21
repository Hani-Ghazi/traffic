const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors');
const busStopModel = require('../models/busStop');
const busModel = require('../models/bus');
const constants = require('../utils/constansts');
// var ObjectId = mongoose.Schema.Types.ObjectId;

var stopsSchema = new mongoose.Schema({
  stopId: {
    type: Number
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
  }
});

stopsSchema.statics.updateStops = function (stops, busId) {
  if (!stops || !stops.length)
    return Promise.reject(errors.missingData);
  var promises = [];
  var thisModel = this;
  var thisBusModel = busModel;
  var thisBusStopModel = busStopModel;
  stops.forEach(function (stop) {
    if (stop.new) {
      promises.push(thisBusStopModel.create({
          bus: busId,
          stop: stop.id,
          order: stop.order
        })
      );
    }
    else {
      var id = mongoose.Types.ObjectId(stop.id);
      promises.push(thisModel.update({_id: id}, {
        lat: stop.lat,
        lng: stop.lng,
        arName: stop.arName
      }));
      promises.push(thisBusStopModel.update({bus: mongoose.Types.ObjectId(busId), stop: mongoose.Types.ObjectId(stop.id)}, {order: stop.order}));
    }
  });
  return Promise.all(promises).then(function () {
    return thisBusModel.updateStopsCount(busId, stops.length)
      .then(function () {
        return thisBusStopModel.find({bus: busId})
          .populate('stop', constants.stop.defautlFields)
          .then(function (stops) {
            return stops;
          });
      })

  });
}


stopsSchema.statics.getStopById = function (stopId) {
  var thisModel = this;
  if(!stopId || stopId == '')
    return Promise.reject(errors.missingData);
  return thisModel.findById(stopId)
    .then(function (stop) {
      if(!stop)
        return Promise.reject();
      stop = stop.toObject();
      delete stop.stopId;
      return stop
    });
}

module.exports = mongoose.model('stop', stopsSchema, 'stop');