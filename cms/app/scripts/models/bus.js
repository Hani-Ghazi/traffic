'use strict';

angular.module('trafficCMS.models')
  .factory('Bus', function(Restangular) {
    var route = 'buses';
    var Bus = Restangular.all(route);

    return Bus;
  });