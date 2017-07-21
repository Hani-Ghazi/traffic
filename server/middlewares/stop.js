const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const tempFile = require('../utils/tempFile');

module.exports = {
  getAllStops: function (req, res, next) {
    models.stop.find({}, constants.stop.defautlFields)
      .then(function(stops){
        res.json(stops)
      }).catch(next);
  },
  removeStop: function (req, res, next) {
    var thisModels = models;
    thisModels.busStop.remove({stop: req.params.stopId})
      .then(function (err) {
        thisModels.stop.remove({_id: req.params.stopId})
          .then(function (err) {
            tempFile.countStops();
            res.json();
          })
      }).catch (next);
  },
  getStopById: function (req, res, next) {
    models.stop.getStopById(req.params.stopId)
      .then(function (stop) {
        res.json(stop);
      }).catch(next);
  },
  createNewStop: function (req, res, next) {
    models.stop.create({
      stopId: new Date().getTime(),
      lat: req.body.lat,
      lng: req.body.lng,
      arName: req.body.arName,
      enName: ' '
    }).then(function (stop) {
      res.json(stop);
    }).catch(next)
  },
  updateStop: function (req, res, next) {
    models.stop.update({_id: mongoose.Schema.Types.ObjectId(req.params.stopId)}, req.body)
      .then(function (err) {
        // err.result

      }).catch(next);
  }
};

