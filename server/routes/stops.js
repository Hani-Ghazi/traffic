const express = require('express');
const middleware = require('../middlewares/stop');
const userMiddleware = require('../middlewares/user');
const router = express.Router();


router.use(userMiddleware.checkLogin);

router
  .get('/', middleware.getAllStops)

  .post('/', middleware.createNewStop)

  .get('/:stopId', middleware.getStopById)

  .put('/:stopId', middleware.updateStop)

  .delete('/:stopId', middleware.removeStop);

module.exports = router;


