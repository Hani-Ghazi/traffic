const models = require('../models');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const objectId = mongoose.Types.ObjectId;
const constants = require('../utils/constansts');

module.exports = {
  getIssues: function (req, res, next) {
    var limit = Number(req.query.limit);
    limit = isNaN(limit) ? 10 : limit;
    var offset = Number(req.query.offset);
    offset = isNaN(offset) ? 0 : offset;
    models.issue.getList({
      skip: offset,
      limit: limit,
      populate: [{
       path: 'origin'
      }, {
        path: 'destination'
      }, {
        path: 'creator'
      }],
      projection: constants.issue.defaultFields
    }).then(function (buses) {
      res.json(buses);
    }).catch(next);
  },
  createIssue: function (req, res, next) {
    models.issue.create({
      creator: req.registeredUser.id,
      type: req.body.type,
      origin: req.body.origin,
      destination: req.body.destination,
      startTime: req.body.startTime,
      desc: req.body.desc || ''
    }).then(function (issue) {
      res.json(issue);
    }).catch(next);
  },
  getIssue: function (req, res, next) {
    models.issue.findOne({_id: mongoose.Types.ObjectId(req.params.issueId)})
      .populate('origin', constants.stop.defautlFields)
      .populate('destination', constants.stop.defautlFields)
      .populate('creator')
      .then(function (issue) {
        if(!issue) return Promise.reject();
        res.json(issue);
      }).catch(next);
  },
  updateIssue: function (req, res, next) {
    models.issue.update({_id: objectId(req.params.issueId)}, {
      type: req.body.type,
      origin: req.body.origin,
      destination: req.body.destination,
      desc: req.body.desc
    }).then(function () {
      res.json();
    }).catch(next);
  },
  upVoteIssue: function (req, res, next) {
    models.issueVote.findOne({issue: objectId(req.params.issueId), voter: objectId(req.registeredUser.id)})
      .then(function (issue) {
        if(issue) Promise.reject(error.issue.upVote)
        models.issueVote.create({
          voter: objectId(req.registeredUser.id),
          issue: objectId(req.params.issueId),
          voteType: 'up'
        }).then(function (issue) {
          models.issue.update({_id: objectId(issue.id)}, {$inc: {upVoteCount: 1}})
            .then(function () {
              res.json();
            })
        });
      }).catch(next);
  },
  downVoteIssue: function (req, res, next) {
    models.issueVote.findOne({issue: objectId(req.params.issueId), voter: objectId(req.registeredUser.id)})
      .then(function (issue) {
        if(issue) Promise.reject(error.issue.upVote)
        models.issueVote.create({
          voter: objectId(req.registeredUser.id),
          issue: objectId(req.params.issueId),
          voteType: 'up'
        }).then(function (issue) {
          models.issue.update({_id: objectId(issue.id)}, {$inc: {downVoteCount: 1}})
            .then(function () {
              res.json();
            })
        });
      }).catch(next);
  },
  closeIssue: function (req, res, next) {
    models.issue.remove({_id: objectId(req.params.issueId)})
      .then(function () {
        res.json();
      }).catch(next);
  }
}