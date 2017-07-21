const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const mongoose = require('mongoose');

module.exports = {
  getBuses: function (req, res, next) {
    var limit = Number(req.query.limit);
    limit = isNaN(limit) ? 10 : limit;
    var offset = Number(req.query.offset);
    offset = isNaN(offset) ? 0 : offset;
    models.bus.getList({
      skip: offset,
      limit: limit,
      projection: constants.bus.defaultFields
    }).then(function (buses) {
      res.json(buses);
    }).catch(next);
  },
  getBusById: function (req, res, next) {
    models.bus.getBusById(req.params.busId)
      .then(function (bus) {
        console.log(bus);
        res.json(bus);
      }).catch(next);
  },
  getStops: function (req, res, next) {
    var limit = Number(req.query.limit);
    limit = isNaN(limit) ? 10 : limit;
    var offset = Number(req.query.skip);
    offset = isNaN(offset) ? 0 : offset;
    models.stop.getList({
      skip: offset,
      limit: limit,
      projection: constants.stop.defautlFields
    }).then(function (stops) {
      res.json(stops);
    }).catch(next);
  },
  getStopsByBusId: function (req, res, next) {
    models.busStop.find({bus: req.params.busId})
      .populate('stop', constants.stop.defautlFields)
      .then(function (stops) {
        res.json(stops);
      }).catch(next);
  },
  getBusesByStopId: function (req, res, next) {
    models.busStop.find({stopId: req.params.stopId})
      .populate('busId', constants.bus.defaultFields)
      .then(function (buses) {
        res.json(buses);
      }).catch(next);
  },
  updateStops: function (req, res, next) {
    models.stop.updateStops(req.body.stops, req.params.busId)
      .then(function (stops) {
        res.json(stops);
      }).catch(next);
  },
  removeStopByIdFromBusList: function (req, res, next) {
    var thisModels = models;
    thisModels.busStop.remove({stop: req.params.stopId, bus: req.params.busId})
      .then(function () {
        thisModels.bus.update({_id: mongoose.Types.ObjectId(req.params.busId)}, {$inc: {stopsCount: -1}})
          .then(function (bus) {
            res.json(bus);
          });
    }).catch(next);
  }
}