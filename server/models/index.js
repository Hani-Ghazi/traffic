const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config/config');


mongoose.plugin(require('./getListPlugin'));

var models = {
  user: require('./user'),
  bus: require('./bus'),
  stop: require('./stops'),
  busStop: require('./busStop'),
  graph: require('./graph'),
  issue: require('./issue'),
  issueVote: require('./issueVote')
};

var schemas = Object.keys(models).map(function (key) {
  return models[key].schema;
});

mongoose.Promise = Promise;
mongoose.set('debug', process.env.LOCAL_DEV === '1');

schemas.forEach(function (schema) {
  schema.set('toJSON', {
    virtuals: true,
    getters: true
  });
  schema.set('toObject', {
    virtuals: true,
    getters: true
  });
});

models.connect = function () {
  return new Promise(function (resolve, reject) {
    mongoose.connect(config.mongo.connectionString, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    })
  })
};

module.exports = models;


