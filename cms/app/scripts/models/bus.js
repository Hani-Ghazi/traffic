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
    
    return Bus;
  });