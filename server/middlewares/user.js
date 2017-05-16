const models = require('../models');
const errors = require('../utils/errors');
const utils = require('../utils');

var getUserByToken = function (token, additionalFields) {
  if (!token) {
    return Promise.reject(errors.authRequiredError);
  }
  return models.user.getUserByToken(token);
};

module.exports = {
  checkLogin: function (req, res, next) {
    var token = req.get('X-Access-Token') || req.query.access_token;
    getUserByToken(token).then(function (user) {
      req.registeredUser = user;
      next();
    }).catch(function (err) {
      console.log(err);
      return next(errors.authRequiredError);
    })
  },
  login: function (req, res, next) {
    models.user.login(req.body.email, req.body.password)
      .then(function (user) {
        // if (!user.isActive) {
        //   return next(errors.users.notVerified);
        // }
        user.token = utils.getNewToken(user.id);
        res.json(user);
      }).catch(next);
  },
  createUser: function (req, res, next) {
    models.user.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      language: req.body.language,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(function (user) {
        res.json(user);
      }
    ).catch(next);
  },
  getCurrentUser: function (req, res, next) {
    res.json(req.registeredUser);
  }
};

