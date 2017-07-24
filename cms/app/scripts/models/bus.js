'use strict';

angular.module('trafficCMS.models')
  .factory('Bus', function(Restangular) {
    var route = 'buses';
    var Bus = Restangular.all(route);
    
    Bus.getStopsByBusId = function (busId) {
      return Restangular.one(route).one(busId).one('stops').get();
    };

    Bus.updateStops = function (busId, stops) {
      return Restangular.one(route).one(busId).one('stops').customPUT({stops: stops});
    };

    Bus.removeStop = function(busId, stopId){
      return Restangular.one(route + '/stops').one(busId).one(stopId).remove();
    };

    Bus.removeBus = function (busId) {
      return Restangular.one(route).one(busId).remove();
    };

    Bus.new = function (arName) {
      return Restangular.one(route).customPOST({arName: arName});
    };

    Bus.allBusMap = function () {
      return Restangular.one(route + '/map').get();
    };

    return Bus;
  });