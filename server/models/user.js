const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const config = require('../config/config');
const errors = require('../utils/errors');
const userModel = require('./user');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
      type: String,
      unique: true,
      trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'ar']
  },
  role: {
    type: 'String',
    enum: ['client', 'admin'],
    default: 'client'
  }
});

// Saves the user's password hashed (plain text password storage is not good)
userSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.statics.getUserByToken = function(token) {
  var model = this;
  return new Promise(function(resolve, reject) {
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
      if (err) {
        return reject(err);
      } else {
        //console.log("this", this);
        return model.findById(decoded.id)
          .then(function(user) {
            if (!user || !user.id) {
              return reject(errors.authRequiredError);
            }
            return resolve(user);
          });
      }
    });
  })

};

userSchema.statics.createUser = function(user) {
  return this.create(user);
};

userSchema.statics.login = function(authField, password) {
  if (!authField || !password) {
    return Promise.reject(errors.users.incorrectCreds);
  }
  return this.findOne({
      $or: [{
        email :authField.toLowerCase().trim()
      }, {
        phone: authField.toLowerCase().trim()
      }, {
        username: authField.toLowerCase().trim()
      }]
  }).then(function(user) {
    if (!user) {
      return Promise.reject();
    }
    var isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return Promise.reject(errors.users.incorrectCreds);
    user = user.toObject();
    // don't return password !!!!!
    delete user.password;
    return user;
  });
}

userSchema.statics.createAdmin = function() {
  var userModel = this;
  return this.findOne({
    username: 'admin'
  }).then(function(admin) { 
    if (!admin) {
      return userModel.createUser({
        username: 'admin',
        email: 'admin@admin.com',
        password: '123456',
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin',
        phone: '123456789'
      });
    }
    return Promise.resolve();
  });
}

module.exports = mongoose.model('user', userSchema, 'user');
