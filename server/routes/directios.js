const express = require('express');
const userMiddleware = require('../middlewares/user');
const  directionMiddleware = require('../middlewares/direction');

const router = express.Router();


router.use(userMiddleware.checkLogin);

router.post('/', directionMiddleware.getDirection)
  .get('/all', directionMiddleware.getAllGraph)



module.exports = router;