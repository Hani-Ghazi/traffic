'use strict';

angular.module('trafficCMS.models')
  .factory('Stop', function(Restangular) {
    var route = 'stops';
    var Stop = Restangular.all(route);

    Stop.remove = function (busId, stopId) {
      return Restangular.one(route).one(busId).one(stopId).remove();
    };

    Stop.getAllStops = function () {
      return Restangular.one(route).get();
    };

    Stop.remove = function (stopId) {
      return Restangular.one(route + '/' + stopId).remove();
    };

    Stop.getStopById = function (stopId) {
      return Restangular.one(route).customGET(stopId);
    };
    
    // Stop.save = function (stop) {
    //
    // }

    return Stop;
  });