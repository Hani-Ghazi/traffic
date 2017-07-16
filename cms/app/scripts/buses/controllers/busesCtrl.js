'use strict';

angular.module('trafficCMS.buses')
  .controller('BusesCtrl', function ($scope, $filter, $state, $stateParams, NgTableParams, models) {
    $scope.busesTable = new NgTableParams({
      page: $stateParams.page || 1,
      count: $stateParams.count || 10,
    }, {
      getData: function(params) {
        $scope.isLoading = true;
        $scope.isError = false;
        if (!$state.is($state.current, {
            page: params.page(),
            count: params.count()
          })) {
          $state.go($state.current.name, {
            page: params.page(),
            count: params.count()
          }, {
            notify: false
          });
        }
        var offset = (params.page() - 1) * params.count();
        return models.bus.getList({
          offset: offset,
          limit: params.count()
        }).then(function(buses) {
          $scope.isLoading = false;
          params.total(buses.count);
          return buses;
        }, function(err) {
          $scope.isLoading = false;
          $scope.isError = true;
        });
      }
    });
  })