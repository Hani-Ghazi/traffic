const models = require('../models');
const xlsx = require('node-xlsx');
const _ = require('lodash');
const Promise = require('bluebird');

module.exports = {

  clearTables: function () {
    return models.bus.remove().then(function () {
      return models.stop.remove();
    }).then(function () {
      return models.busStop.remove();
    });


  },
  parseExcel: function () {
    var obj = xlsx.parse(__dirname + '/routes.xlsx'); // parses a file
    var buses = obj[0].data,
      stops = obj[1].data,
      busStops = obj[2].data;

    return new Promise(function (resolve, reject) {
      // loop for buses
      buses.forEach(function (bus, index) {
        if (index && bus) {
          models.bus.create({
            busId: bus[0],
            arName: bus[1],
            enName: ' ',
            length: bus[2]
          }).catch(reject);
        }
      });
      // loop for stops
      stops.forEach(function (stop, index) {
        if (index) { // to avoid the header
          models.stop.create({
            stopId: stop[0],
            arName: stop[1],
            enName: ' ',
            lat: stop[2],
            lng: stop[3]
          }).catch(reject);
        }
      });
      resolve();
    })
  },
  insertKsr: function () {
    var obj = xlsx.parse(__dirname + '/routes.xlsx'); // parses a file
    var busStops = obj[2].data;
    models.bus.find({}, function (err, buses) {
      if (err) {
        console.log(err);
        throw err;
      }
      models.stop.find({}, '_id stopId', function (err, stops) {
        if (err) throw err;
        busStops.forEach(function (busStop, index) {
          if (index) {
            var busId = _.find(buses, {busId: busStop[1]});
            var stopId = _.find(stops, {stopId: busStop[2]});
            models.busStop.create({
              bus: busId._id,
              stop: stopId._id
            }, function (err) {
              if (err) {
                console.log(err);
                throw err;
              }
            });
          }
        });
      });
    });
  },
  countStops: function () {
    models.bus.find({})
      .then(function (buses) {
        if(!buses) return ;
        buses.forEach(function(bus){
          models.busStop.find({bus: bus.id})
            .then(function(stops){
              bus.stopsCount = stops.length;
              bus.save(function (err) {
                if(err) console.log("errr is: "+ err);
              });
            });
        });
      });
  }
}

