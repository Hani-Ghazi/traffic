const mongoose = require('mongoose');
const Promise = require('bluebird');

var issueSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  submitTime: {
    type: mongoose.Types.Date,
    required: true
  },
  startTime: {
    type:mongoose.Types.Date,
    required: true
  },
  finishTime: {
    type: mongoose.Types.Date
  },
  type: {
    type: String,
    default: 'danger',
    enum: ['dange' , 'block', 'traffic']
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'stop'
  },
  destination:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'stop'
  },
  desc:{

  },
  isClosed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('issue', issueSchema, 'issue');