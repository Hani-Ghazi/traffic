const express = require('express');
const issueMiddleware = require('../middlewares/issue');
const userMiddleware = require('../middlewares/user');
const router = express.Router();

router.use(userMiddleware.checkLogin);

router
  .get('/', issueMiddleware.getIssues)
  .post('/', issueMiddleware.createIssue)
  .get('/:issueId', issueMiddleware.getIssue)
  .put('/:issueId', issueMiddleware.updateIssue)
  .post('/:issueId/upvote', issueMiddleware.upVoteIssue)
  .post('/:issueId/downvote', issueMiddleware.downVoteIssue)
  .post('/:issueId/close', issueMiddleware.closeIssue);


module.exports = router;



