const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const MongooseError = require('mongoose').Error;
const TrafficError = require('./TrafficError');
const errors = require('./errors');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';

var pseudoRandomBytesAsync = Promise.promisify(crypto.pseudoRandomBytes);

module.exports = {
  getNewToken: function(userId) {
    return jwt.sign({
      id: userId
    }, config.jwt.secret);
  },
  parseMongoUniqueError: function(err) {
    // parsing the error. ref: https://github.com/bevacqua/mongoose-parse
    var parts = /^E11000 duplicate key error (index|collection): (?:[a-z-.]+\.)+([a-z]*) index\: ([a-z]+)_([0-9]+)/i;
    var matches = err && err.errmsg.match(parts);
    if (matches) {
      var collectionName = matches[2];
      var errorKey = matches[3];
      try {
        var error = errors[collectionName][errorKey + 'Exists'];
        err = TrafficError.newError(error);
      }
      catch(e) {}
    }
    return err;
  },
  errorHandler: function(err, req, res, next) {
    if (env !== 'production') {
      console.log(err);
    }
    if (err instanceof MongooseError && err.name === 'ValidationError') {
      // need to parse the mongoose error
      err.json = {
        error: 'mogoose error'
      };
    }
    // handle unique errors here to return a readable message
    else if (err.name === 'MongoError' && err.code === 11000) {
      err = module.exports.parseMongoUniqueError(err);
    }
    res.status(err.status || 500).json(err);
  },

}
