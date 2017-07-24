const mongoose = require('mongoose');
const Promise = require('bluebird');

var issueVoteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  voteType: {
    type: String,
    enum: ['up', 'down']
  },
  voteTime: {
    type: Date,
    default: Date.now
  },
  issue:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'issue'
  }
});

module.exports = mongoose.model('issueVote', issueVoteSchema, 'issueVote');