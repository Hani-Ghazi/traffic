'use strict';

angular.module('trafficCMS.buses')
  .controller('BusCtrl', function ($scope, $timeout, $mdDialog, bus, models, NgMap, NgTableParams) {
    $scope.isLoading = false;
    $scope.isEditing = false;
    $scope.bus = bus;
    $scope.newStop = undefined;
    models.stop.getAllStops().then(function(stops){
      $scope.allStops = stops;
    });

    var sortStops = function(){
      $scope.stops.sort(function (a, b) {
        return a.order - b.order;
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
            $scope.directions[$scope.directions.length - 1].destination = stop;
            $scope.directions[$scope.directions.length - 1].wayPoints = wayPoints;
          }
          $scope.directions.push({origin: stop});

          wayPoints = [];
        }
        else {
          wayPoints.push({location: {lat: stop.lat, lng: stop.lng}, stopover: true});
        }
      });

      $scope.directions[$scope.directions.length - 1].destination = $scope.stops[$scope.stops.length - 1];
      $scope.directions[$scope.directions.length - 1].wayPoints = wayPoints;

    };

    models.bus.getStopsByBusId($scope.bus.id).then(function (stops) {
      $scope.stops = stops.map(function (row) {
        row.stop.order = row.order;
        return row.stop;
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
          return $scope.stops.slice(offset, offset + params.count());
        }
      });
    });

    $scope.addStop = function (newStop) {
      if(angular.isUndefined(newStop))
        return ;
      newStop.new = true;
      $scope.stops.push(newStop);
      sortStops();
      $scope.stopsTable.reload();
    };

    $scope.removeStop = function (index) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure')
        .textContent('Are you sure to delete the stop:' + $scope.stops[index].arName + ' ?')
        .ok('Delete it!')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function () {
        models.stop.remove($scope.bus.id, $scope.stops[index].id)
          .then(function () {
            $scope.stops.splice(index, index + 1);
            $scope.stopsTable.reload();
          });
      });
    };

    $scope.justLog = function (e, marker, markerStop) {
      var newLat = e.latLng.lat();
      var newLng = e.latLng.lng();
      console.log("lat: " + newLat + ",  lng: " + newLng);
      $scope.stops.map(function (stop) {
        if (markerStop.id == stop.id) {
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
      models.bus.updateStops($scope.bus.id, $scope.stops)
        .then(function () {
          $scope.isEditing = false;
        });
    }

  })
;