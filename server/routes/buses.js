const express = require('express');
const middleware = require('../middlewares/bus');
const userMiddleware = require('../middlewares/user');
const router = express.Router();

router.use(userMiddleware.checkLogin);

/**
 * @api {get} /buses Get list of Buses lines
 * @apiName BusesList
 * @apiGroup Buses and Stops
 *
 * @apiUse AccessTokenParams
 * @apiUse GetListParams
 * @apiSuccess {[Bus]} buses The array of buses lines
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
   *     "data": [
   *       {
   *         "id": "592f19c167c5161f00d630a9",
   *         "arName" : "مشروع دمر",
   *         "enName" : " ",
   *         "lenght": "13855.97"
   *       },
   *       {
   *         "id": "592f19c167c5161f00d630a9",
   *         "arName" : "مساكن برزة",
   *         "enName" : " ",
   *         "lenght": "13855.97"
   *       }
   *     ],
   *     "count": 2
   *   }
 *
 * @apiUse AuthRequiredError
 */
router.get('/', middleware.getBuses)

/**
 * @api {get} /buses/stops Get list of all Stops
 * @apiName StopsList
 * @apiGroup Buses and Stops
 *
 * @apiUse AccessTokenParams
 * @apiUse GetListParams
 * @apiSuccess {[Stop]} buses The array of buses lines
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
   *     "data": [
   *       {
   *         "id": "592f19c167c5161f00d630a9",
   *         "arName" : "جسر الرئيس",
   *         "enName" : " ",
   *         "long" : 33.513489,
             "lat" : 36.28987
   *       },
   *       {
   *         "id": "592f19c167c5161f00d630a9",
   *         "arName" : "ساحة الأموين",
   *         "enName" : " ",
   *         "long" : 33.513489,
             "lat" : 36.28987
   *       }
   *     ],
   *     "count": 2
   *   }
 *
 * @apiUse AuthRequiredError
 */
  .get('/stops', middleware.getStops)

  /**
   * @api {get} /buses/bus_id/stops Get list of all Stops that's exist in specific bus line
   * @apiName StopsByBusLine
   * @apiGroup Buses and Stops
   *
   * @apiUse AccessTokenParams
   * @apiSuccess {[Data]} buses The array of buses lines
   * @apiSuccessExample {json} Success Response
   *   HTTP/1.1 200 OK
   *   [{
         "_id": "592f19c167c5161f00d63156",
         "busId": "592f19c167c5161f00d630a8",
         "stopId": {
           "_id": "592f19c167c5161f00d630b9",
           "arName": "جسر الرئيس",
           "long": 33.512755,
           "lat": 36.289055,
           "id": "592f19c167c5161f00d630b9"
         },
         "__v": 0,
         "id": "592f19c167c5161f00d63156"
       },
   {
     "_id": "592f19c167c5161f00d63158",
     "busId": "592f19c167c5161f00d630a8",
     "stopId": {
       "_id": "592f19c167c5161f00d630bb",
       "arName": "جسر فكتوريا",
       "long": 33.513819,
       "lat": 36.295341,
       "id": "592f19c167c5161f00d630bb"
     },
     "__v": 0,
     "id": "592f19c167c5161f00d63158"
   },
   {
     "_id": "592f19c167c5161f00d63157",
     "busId": "592f19c167c5161f00d630a8",
     "stopId": {
       "_id": "592f19c167c5161f00d630ba",
       "arName": "شارع شكري القوتلي",
       "long": 33.513489,
       "lat": 36.28987,
       "id": "592f19c167c5161f00d630ba"
     },
     "__v": 0,
     "id": "592f19c167c5161f00d63157"
   }]
   *
   * @apiUse AuthRequiredError
   */
  .get('/:busId/stops', middleware.getStopsByBusId)

  /**
   * @api {get} /buses/bus_id Get Bus by ID
   * @apiName BusById
   * @apiGroup Buses and Stops
   *
   * @apiUse AccessTokenParams
   * @apiSuccess {[Bus]} buses The array of buses lines
   * @apiSuccessExample {json} Success Response
   *   HTTP/1.1 200 OK
   *   {
   *     "id": "592f19c167c5161f00d630a9",
   *     "arName" : "مشروع دمر",
   *     "enName" : " ",
   *     "lenght": "13855.97"
   *   }
   *
   * @apiUse AuthRequiredError
   */
  .get('/:busId', middleware.getBusById)

  /**
   * @api {get} /buses/stops/stop_id Get list of all buses that's across in specific bus stop
   * @apiName busesByStop
   * @apiGroup Buses and Stops
   *
   * @apiUse AccessTokenParams
   * @apiSuccess {[Data]} buses The array of buses lines
   * @apiSuccessExample {json} Success Response
   *   HTTP/1.1 200 OK
   [
     {
       "_id": "592f19c167c5161f00d63156",
       "busId": {
         "_id": "592f19c167c5161f00d630a8",
         "arName": "الشيخ خالد",
         "enName": " ",
         "id": "592f19c167c5161f00d630a8"
       },
       "stopId": "592f19c167c5161f00d630b9",
       "__v": 0,
       "id": "592f19c167c5161f00d63156"
     },
     {
       "_id": "592f19c167c5161f00d63167",
       "busId": {
         "_id": "592f19c167c5161f00d630a9",
         "arName": "مشروع دمرح_مساكن الحرس",
         "enName": " ",
         "id": "592f19c167c5161f00d630a9"
       },
       "stopId": "592f19c167c5161f00d630b9",
       "__v": 0,
       "id": "592f19c167c5161f00d63167"
     }
   ]
   *
   * @apiUse AuthRequiredError
   */
  .get('/stops/:stopId', middleware.getBusesByStopId)
module.exports = router;