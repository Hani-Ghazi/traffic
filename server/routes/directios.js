const express = require('express');
const userMiddleware = require('../middlewares/user');
const  directionMiddleware = require('../middlewares/direction');

const router = express.Router();


router.use(userMiddleware.checkLogin);

router.get('/', directionMiddleware.getDirection);



module.exports = router;