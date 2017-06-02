'use strict';

angular.module('trafficCMS.models')
  .factory('Stop', function(Restangular) {
    var route = 'buses/stops';
    var Stop = Restangular.all(route);

    return Stop;
  });