'use strict';

angular.module('trafficCMS.stops')
  .controller('StopCtrl', function ($scope, stop, models, NgMap, NgTableParams) {
    $scope.isLoading = false;
    $scope.isNew = angular.isUndefined(stop) || stop === '';
    $scope.stop = stop;
    if($scope.isNew){
      $scope.stop.lat = 33.513811;
      $scope.stop.lng = 36.276508;
    }

    var changeMarkerPosition = function (event) {
      var newLat = e.latLng.lat();
      var newLng = e.latLng.lng();
      $scope.stop.lat = newLat;
      $scope.stop.lng = newLng;
    };

    NgMap.getMap().then(function (map) {
      $scope.map = map;
    });

    $scope.saveStop = function () {
      if(!$scope.stopForm.$valid){
        return;
      }
      $scope.stop.save();
      // models.stop.save($scope.stop).then(function (stop) {
      //   $scope.stop = stop;
      // });
    }
  })
;