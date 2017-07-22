const models = require('../models');
const Promise = require('bluebird');
const mongoose = require('mongoose');
var config = require('../config/config');
const constants = require('../utils/constansts');
var GoogleMapsApi = require('googlemaps');
var fs = require('fs');
var path = require('path');

var gmAPI;

var publicConfig = {
  key: config.map.APIKEY,
  stagger_time: 1000, // for elevationPath
  encode_polylines: false,
  secure: false // use https
};

function initMap() {
  gmAPI = new GoogleMapsApi(publicConfig);
}

function getDistance(origin, destination, edge, mode) {
  var params = {
    origins: origin.lat + ',' + origin.lng,
    destinations: destination.lat + ',' + destination.lng,
    travelMode: mode || 'WALKING'
  };
  gmAPI.distance(params, function (err, result) {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("result", result);
    if (edge) {
      edge.distance = result.rows[0].elements[0].distance.value;
      edge.duration = result.rows[0].elements[0].duration.value;
      edge.save(function (err) {
        if (err)
          console.log(err);
      });
    }
  });
}

function toRad(Value) {
  return Value * Math.PI / 180;
}

function checkWalkingDistance(origin, destination) {
  var R = 6371; // in km
  var dLat = toRad(destination.lat - origin.lat);
  var dLon = toRad(destination.lng - origin.lng);
  var lat1 = toRad(origin.lat);
  var lat2 = toRad(destination.lat);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d < 2.0;
}

var res = [];

function findEdge(origin, destination) {
  return models.graph.findOne({
    origin: origin.id,
    destination: destination.id
  }).then(function (edge) {
    if (!edge) { // if this edge not exist before
      var edge = new models.graph({
        origin: origin.id,
        destination: destination.id,
        type: 'DRIVING'
      });
      res.push({edge: edge, origin: origin, destination: destination});
    }
  });
}

function drivingEdges() {
  var promises = [];
  models.bus.find({}) // get all buses
    .then(function (buses) {
      buses.forEach(function (bus) {
        return models.busStop.AllStopByBusId(bus.id) // get related stops
          .then(function (stops) {
            for (var i = 1; i < stops.length; i++) { // make edge between every 2 stop
              promises.push(findEdge(stops[i - 1].stop, stops[i].stop));
            }
            Promise.all(promises).then(function () {
              var index = 0;
              var size = res.length;
              var timer = setInterval(function () {
                if (index == size)
                  clearInterval(timer);
                else {
                  getDistance(res[index].origin, res[index].destination, res[index].edge, 'DRIVING');
                  index++;
                }
              }, 500);
            }).catch(function (err) {
              console.log("err", err);
            })
          });
      });
    });
}

function walkingEdges() {
  var count = 0, total = 0, res = [];
  models.stop.find({})
    .then(function (stops) {
      for (var i = 0; i < stops.length - 1; i++) {
        for (var j = i + 1; j < stops.length; j++) {
          if (checkWalkingDistance(stops[i], stops[j])) {
            var edge = new models.graph({
              origin: stops[i - 1],
              destination: stops[i],
              type: 'WALKING'
            });
            res.push(edge);
            count++;
          }
          total++;
        }
      }
      var index = 0;
      var size = res.length;
      var timer = setInterval(function () {
        if (index == size)
          clearInterval(timer);
        else {

          getDistance(res[index].origin, res[index].destination, res[index], 'WALKING');
          index++;
        }
      }, 30);
      console.log("count", count);
      console.log("total", total);
    });
}


module.exports = {
  updateGraphWieghts: function () {
    if (!gmAPI)
      initMap();
    // var temp = new models.graph({
    //   origin: '59722bcdbc64f129aceec311',
    //   destination: '59722bcdbc64f129aceec30f',
    //   type: 'DRIVING'
    // });
    // getDistance({lat: 33.524291, lng: 36.293417}, {lat: 33.529933, lng: 36.293813}, temp);
  },
  initGraph: function () {
    if (!gmAPI)
      initMap();
    drivingEdges();
    // walkingEdges();
  },
  writeGraphFile: function () {
    var arr = [];
    models.graph.find({})
      .then(function (edges) {
        edges.forEach(function (edge) {
          arr.push(edge);
        });
        var path1 = path.resolve(__dirname, '../graphFiles/test');
        var fd = fs.closeSync(fs.openSync(path.resolve(__dirname, '../graphFiles/test'), 'w'));
        var file = fs.createWriteStream(path1);
        file.on('error', function (err) {
          console.log(err);
        });
        file.write(arr.length + '\n');
        arr.forEach(function (edge) {
          file.write(edge.origin + ' ' + edge.destination + ' ' + edge.duration + '\n');
        });
        file.end();
      });
  }
}