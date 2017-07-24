const models = require('../models');
const Promise = require('bluebird');
const mongoose = require('mongoose');
var config = require('../config/config');
const constants = require('../utils/constansts');
var GoogleMapsApi = require('googlemaps');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var gmAPI;
var countWalkingEdges = 0;

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
    travelMode: mode || 'DRIVING'
  };
  gmAPI.distance(params, function (err, result) {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("result", result);
    if (edge && result.status == 'OK') {
      edge.distance = result.rows[0].elements[0].distance.value;
      edge.duration = result.rows[0].elements[0].duration.value;
      if (edge.duration) {
        edge.save(function (err) {
          if (err)
            console.log(err);
        });
      }
      if (mode == "WALKING") { // reverse the edge
        models.graph.create({
          origin: edge.destination,
          destination: edge.origin,
          distance: edge.distance,
          duration: edge.duration,
          type: "WALKING"
        })
        countWalkingEdges++;
      }
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
  return d;
}

var res = [];


function findEdge(origin, destination) {
  return models.graph.findOne({
    origin: origin.id,
    destination: destination.id
  }).then(function (existEdge) {
    if (!existEdge) { // if this edge not exist before
      res.push({
        origin: origin,
        destination: destination,
        type: "WALKING",
        edge: new models.graph({
          origin: origin.id,
          destination: destination.id,
          type: 'WALKING'
        })
      });
      countWalkingEdges++;
    }
  });
}

function drivingEdges() {
  var promises = [];
  var edgeCount = 0;
  models.bus.find({}) // get all buses
    .then(function (buses) {
      buses.forEach(function (bus) {
        promises.push(models.busStop.AllStopByBusId(bus.id) // get related stops
          .then(function (stops) {
            for (var i = 1; i < stops.length; i++) { // make edge between every 2 stop
              res.push({
                origin: stops[i - 1].stop,
                destination: stops[i].stop,
                type: "DRIVING",
                edge: new models.graph({
                  origin: stops[i - 1].stop.id,
                  destination: stops[i].stop.id,
                  type: 'DRIVING'
                })
              });
              edgeCount++
              console.log('origin: ' + stops[i - 1].stop.arName + ', order: ' + stops[i - 1].order);
              console.log('destination: ' + stops[i].stop.arName + ', order: ' + stops[i].order);
            }
            console.log("---------------------------------------");
            return Promise.resolve();
          })
        );
        Promise.all(promises).then(function () {
          setTimeout(function () {
            var index = 0;
            var size = res.length;
            var timer = setInterval(function () {
              if (index == size)
                clearInterval(timer);
              else {
                // console.log("res", res);
                getDistance(res[index].origin, res[index].destination, res[index].edge, 'DRIVING');
                index++;
              }
            }, 1000);
          }, 2000);
        })
      });
    });
}

function walkingEdges() {
  var count = 0, total = 0;
  models.stop.find({})
    .then(function (stops) {
      for (var i = 0; i < stops.length - 1; i++) {
        for (var j = i + 1; j < stops.length; j++) {
          if (checkWalkingDistance(stops[i], stops[j]) < 2.0) {
            findEdge(stops[i], stops[j]);
          }
          total++;
        }
      }
      setTimeout(function () {
        var index = 0;
        var size = res.length;
        var timer = setInterval(function () {
          if (index == size)
            clearInterval(timer);
          else {
            getDistance(res[index].origin, res[index].destination, res[index].edge, 'WALKING');
            index++;
          }
        }, 1000);
      }, 20000);
    });
}


module.exports = {
  updateGraphWieghts: function () {
    if (!gmAPI)
      initMap();
  },
  initGraph: function () {
    if (!gmAPI)
      initMap();
    // drivingEdges();
    walkingEdges();
    getDistance({lat: 33.531589, lng: 36.316468}, {lat: 33.5254853879807, lng: 36.3056749825562}, null, "DRIVING");
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
          if (edge.duration) {
            if (edge.type == "WALKING")
              edge.duration += 600;
            file.write(edge.origin + ' ' + edge.destination + ' ' + edge.duration + '\n');
          }
        });
        console.log('end writing !!');
        file.end();
      });
  },
  testJar: function (originId, destId) {
    var exec = require('child_process').exec, child;
    var path1 = path.resolve(__dirname, '../graphFiles');
    var result = [];
    var pathNo = -1;
    return new Promise(function (resolve, reject) {
      child = exec('java -jar ' + path1 + '/graph-2.3.0.jar ' + path1 + '/test ' + originId + ' ' + destId,
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          var lines = stdout.split('\n');
          _.forEach(lines, function (line) {
            if (line[0] == '[') {
              var temp = line.split(':');
              result.push({total: temp[1], stops: []});
              return;
            }
            if (line.indexOf('Path') != -1 || line == "") {
              pathNo++;
              return;
            }
            var segments = line.split(' ');
            result[pathNo].stops.push(segments[0]);
            if (result.length == 3) {
              return result;
            }
          });
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        });
      setTimeout(function () {
        return resolve(result);
      }, 500)
    });

  },
  getNearestStop: function (lat, lng) {
    return models.stop.find({})
      .then(function (stops) {
        var bestMatch = 10000;
        var bestStopMatch = null;
        stops.forEach(function (stop) {
          var temp = checkWalkingDistance({lat: lat, lng: lng}, stop);
          if(bestMatch > temp) {
            bestMatch = temp;
            bestStopMatch = stop;
          }
        });
        return bestStopMatch;
      })
  },
  fixMissingDriving: function () {
    initMap();
    models.graph.find({type: "DRIVING"})
      .populate('origin')
      .populate('destination')
      .then(function (stops) {
        stops.forEach(function (stop, index) {
          if(!index) return;
          if(checkWalkingDistance(stop.origin, stop.destination) < 2.0){
            setTimeout(function () {
              var edge = new models.graph({
                origin: stop.origin.id,
                destination: stop.destination.id,
                type: 'WALKING'
              });
              getDistance(stop.origin, stop.destination, edge, "WALKING");
            }, 100 * index);
          }

        })
      })
    setTimeout(function () {
      console.log(countWalkingEdges);
    }, 10000)
  }
}