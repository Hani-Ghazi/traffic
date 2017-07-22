'use strict';

angular.module('trafficCMS.buses')
  .controller('BusesCtrl', function ($scope, $filter, $mdDialog, $state, $stateParams, NgTableParams, models) {
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

    $scope.remove = function (row) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure')
        .textContent('Are you sure to delete the bus: ' + row.arName + ' ?')
        .ok('Delete it!')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function () {
        models.bus.removeBus(row.id)
          .then(function () {
            $scope.buses = _.filter($scope.buses, function (bus) {
              return bus.id != row.id;
            })
            // $scope.stops.splice(index, index + 1);
            $scope.busesTable.reload();
          });
      });
    };
    
    $scope.newBus = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('What is the new bus called?')
        .placeholder('Bus name')
        .ariaLabel('Bus name')
        .initialValue('')
        .targetEvent(ev)
        .ok('Save')
        .cancel('cancel');

      $mdDialog.show(confirm).then(function(result) {
        if(result != '')
        models.bus.new(result)
          .then(function () {
            $scope.busesTable.reload();
          });
      });
    }
  })