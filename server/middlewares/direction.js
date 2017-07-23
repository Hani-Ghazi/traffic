const models = require('../models');
const errors = require('../utils/errors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const graphModule = require('../utils/graphModule');

module.exports = {
  getDirection: function (req, res, next) {
   graphModule.testJar(req.body.originId, req.body.destId).then(function (result) {
     res.json(result);
   });

  },
  getAllGraph: function (req, res, next) {
    models.graph.find({})
      .then(function (edges) {
        if(!edges) Promise.reject();
        res.json(edges);
      }).catch(next);
  }
}