'use strict';

angular.module('trafficCMS.stops')
  .controller('StopsCtrl', function ($scope, $mdToast, $filter, NgTableParams, models) {
    $scope.isLoading = true;
    $scope.filter = {
      name: '',
      lat: 0,
      lng: 0
    };
    models.stop.getAllStops()
      .then(function (stops) {
        $scope.stops = stops;
        $scope.stopsTable = new NgTableParams({
          page: 1,
          count:10,
          filter: $scope.filter
        }, {
          getData: function (params) {
            $scope.isLoading = false;
            $scope.isError = false;

            var offset = (params.page() - 1) * params.count();
            var temp = $scope.stops.filter(function(stop){
              return stop.arName.toLowerCase().indexOf(params.filter().name) !== -1;
            });
            return temp.slice(offset, params.count());
          }
        });
      });
    
    $scope.remove = function(row){
      models.stop.remove(row.id)
        .then(function () {
          $scope.stops = _.filter($scope.stops, function(stop) {
            return stop.id !== row.id;
          });
          $scope.stopsTable.reload();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Stop has been removed!')
              .position('bottom right')
              .hideDelay(3000)
              .theme("success-toast")
          );
        })
    }
  });