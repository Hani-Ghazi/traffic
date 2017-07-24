'use strict';

angular.module('trafficCMS.models')
  .factory('Issue', function(Restangular) {
    var route = 'issues';
    var Issue = Restangular.all(route);


    return Issue;
  });