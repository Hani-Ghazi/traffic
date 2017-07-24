'use strict';

angular.module('trafficCMS.buses')
  .controller('BusCtrl', function ($scope, $timeout, $mdDialog, bus, models, NgMap, NgTableParams, Restangular) {
    $scope.isLoading = false;
    $scope.isEditing = false;
    $scope.bus = bus;
    $scope.newStop = undefined;


      var sortStops = function () {
        $scope.stops.sort(function (a, b) {
          return a.stop.order - b.stop.order;
        });
      };

    $scope.initMap = function () {
      sortStops();
      var wayPoints = [];
      $scope.directions = [];
      $scope.stops.forEach(function (stop, index) {
        stop.isEditing = false;
        if (index % 9 === 0) {
          if (index) {
            $scope.directions[$scope.directions.length - 1].destination = stop.stop;
            $scope.directions[$scope.directions.length - 1].wayPoints = wayPoints;
          }
          $scope.directions.push({origin: stop.stop});

          wayPoints = [];
        }
        else {
          wayPoints.push({location: {lat: stop.stop.lat, lng: stop.stop.lng}, stopover: true});
        }
      });

      if ($scope.stops.length > 1) {
        $scope.directions[$scope.directions.length - 1].destination = $scope.stops[$scope.stops.length - 1].stop;
        $scope.directions[$scope.directions.length - 1].wayPoints = wayPoints;
      }
    };

    models.bus.getStopsByBusId($scope.bus.id).then(function (stops) {
      stops = Restangular.stripRestangular(stops);
      $scope.stops = stops.map(function (row) {
        row.stop.order = row.order;
        return row;
      });

      models.stop.getAllStops().then(function (allStops) {
        allStops = Restangular.stripRestangular(allStops);
        $scope.allStops = _.differenceBy(allStops, $scope.stops.map(function (row) {
          return row.stop;
        }), 'id');
      });

      $scope.initMap();

      NgMap.getMap().then(function (map) {
        $scope.map = map;
      });

      $scope.stopsTable = new NgTableParams({
        page: 1,
        count: 10
      }, {
        getData: function (params) {
          $scope.isLoading = false;
          $scope.isError = false;
          var offset = (params.page() - 1) * params.count();
          params.total($scope.stops.length);
          var temp = $scope.stops.map(function(row){ return row.stop});
          return temp.slice(offset, offset + params.count());
        }
      });
    });

    $scope.addStop = function (newStop) {
      if (angular.isUndefined(newStop))
        return;
      newStop.new = true;
      $scope.stops.push({stop:newStop});
      sortStops();
      $scope.stopsTable.reload();
    };

    $scope.removeStop = function (stop_remove) {
      if(stop_remove.new){
        $scope.stops = _.filter($scope.stops, function (stop) {
          return stop.stop.id != stop_remove.id;
        });
        return;
      }
      var confirm = $mdDialog.confirm()
        .title('Are you sure')
        .textContent('Are you sure to delete the stop:' + stop_remove.arName + ' ?')
        .ok('Delete it!')
        .cancel('Cancel');
      var exist;
      _.forEach($scope.stops, function (row) {
        if(row.stop.id == stop_remove.id)
          exist = row;
      })
      $mdDialog.show(confirm).then(function () {
        models.bus.removeStop($scope.bus.id, exist.id)
          .then(function () {
            $scope.stops = _.filter($scope.stops, function (stop) {
              return stop.id != exist.id;
            })
            // $scope.stops.splice(index, index + 1);
            $scope.stopsTable.reload();
          });
      });
    };

    $scope.justLog = function (e, marker, markerStop) {
      var newLat = e.latLng.lat();
      var newLng = e.latLng.lng();
      console.log("lat: " + newLat + ",  lng: " + newLng);
      $scope.stops.map(function (stop) {
        if (markerStop.id == stop.stop.id) {
          stop.lat = newLat;
          stop.lng = newLng;
        }
        return stop;
      });
    };
    $scope.startEdit = function (elem) {
      $scope.isEditing = true;
    }

    $scope.saveEdit = function () {
      // console.log($scope.directions);
      models.bus.updateStops($scope.bus.id, $scope.stops.map(function (stop) {
        return stop.stop;
      }))
        .then(function () {
          $scope.isEditing = false;
        });
    }

  })
;