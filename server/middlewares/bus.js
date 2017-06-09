const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');


module.exports = {
  getBuses: function (req, res, next) {
    var limit = Number(req.query.limit);
    limit = isNaN(limit) ? 10 : limit;
    var offset = Number(req.query.skip);
    offset = isNaN(offset) ? 0 : offset;
    models.bus.getList({
      skip: offset,
      limit: limit,
      projection: constants.bus.defaultFields
    }).then(function (users) {
      res.json(users);
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
  getStopsByBusId: function(req, res, next){
    models.busStop.find({busId: req.params.busId})
      .populate('stopId', constants.stop.defautlFields)
      .then(function (stops) {
        res.json(stops);
      }).catch(next);
  },
  getBusesByStopId:function (req, res, next) {
    models.busStop.find({stopId: req.params.stopId})
      .populate('busId', constants.bus.defaultFields)
      .then(function (buses) {
        res.json(buses);
      }).catch(next);
  }
}