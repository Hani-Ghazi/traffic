const mongoose = require('mongoose');
const Promise = require('bluebird');

var issueSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  submitTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  startTime: {
    type: Date,
    required: true
  },
  finishTime: {
    type: Date
  },
  type: {
    type: String,
    default: 'danger',
    enum: ['danger' , 'block', 'traffic']
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
    type: String
  },
  isClosed: {
    type: Boolean,
    default: false
  },
  upVoteCount: {
    type: Number,
    default: 0
  },
  downVoteCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('issue', issueSchema, 'issue');