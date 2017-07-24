const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const mongoose = require('mongoose');

module.exports = {
  getBuses: function (req, res, next) {
    console.log(global.h3h3++);
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
    console.log(global.h3h3++);
    models.bus.getBusById(req.params.busId)
      .then(function (bus) {
        console.log(bus);
        res.json(bus);
      }).catch(next);
  },
  getStops: function (req, res, next) {
    console.log(global.h3h3++);
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
    console.log(global.h3h3++);
    models.busStop.find({bus: mongoose.Types.ObjectId(req.params.busId)})
      .populate('stop', constants.stop.defautlFields)
      .then(function (stops) {
        res.json(stops);
      }).catch(next);
  },
  getBusesByStopId: function (req, res, next) {
    console.log(global.h3h3++);
    models.busStop.find({stopId: req.params.stopId})
      .populate('busId', constants.bus.defaultFields)
      .then(function (buses) {
        res.json(buses);
      }).catch(next);
  },
  updateStops: function (req, res, next) {
    console.log(global.h3h3++);
    models.stop.updateStops(req.body.stops, req.params.busId)
      .then(function (stops) {
        res.json(stops);
      }).catch(next);
  },
  removeStopByIdFromBusList: function (req, res, next) {
    var thisModels = models;
    thisModels.busStop.remove({_id: mongoose.Types.ObjectId(req.params.stopId)})
      .then(function () {
        thisModels.bus.update({_id: mongoose.Types.ObjectId(req.params.busId)}, {$inc: {stopsCount: -1}})
          .then(function (bus) {
            res.json(bus);
          });
    }).catch(next);
  },
  removeBusById :  function (req, res, next) {
    var busId = mongoose.Types.ObjectId(req.params.busId);
    models.bus.remove({_id: busId})
      .then(function () {
        models.busStop.remove({bus: busId}).then(function () {
          res.json();
        })
      }).catch(next);
  },
  createBus: function (req, res, next) {
    models.bus.create({
      arName: req.body.arName,
      enName: ' ',
      length: 0,
      busId: new Date().getTime(),
      stopsCount: 0
    }).then(function () {
      res.json();
    }).catch(next);
  },
  getAllBusMap: function (req, res, next) {
    models.busStop.aggregate([
      {
        $group: {
          _id: "$bus",
          stops: {$push: {stop: "$stop", order: "$order"}}
        }
      }
    ]).then(function (results) {
      var promises = [];
      models.stop.populate(results, {path: "stops.stop"}).then(function (ans) {
        res.json(ans);
      })
    }).catch(next);
  }
}