'use strict';

angular.module('trafficCMS.buses')
  .controller('BusCtrl', function ($scope, $timeout, bus, models, NgMap, NgTableParams) {
    $scope.isLoading = false;
    $scope.isEditing = false;
    $scope.bus = bus;
    $scope.initMap = function () {
      $scope.stops.sort(function (a, b) {
        return a.order - b.order;
      });
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

    }

    models.bus.getStopsByBusId($scope.bus.id).then(function (stops) {
      $scope.stops = stops.map(function (row) {
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
          $scope.isLoading = true;
          $scope.isError = false;
          var offset = (params.page() - 1) * params.count();
          params.total($scope.stops.length);
          return $scope.stops.slice(offset, offset + params.count());
        }
      });
    });

    $scope.justLog = function (e, marker, markerStop) {
      var newLat = e.latLng.lat();
      var newLng = e.latLng.lng();
      console.log("lat: " + newLat + ",  lng: " + newLng);
      $scope.stops.map(function (stop) {
        if(markerStop.id == stop.id){
          stop.lat = newLat;
          stop.lng = newLng;
        }
        return stop;
      });


      //
      // var markerStop = e.stop;
      //
      // $scope.stops = $scope.stops.map(function(stop){
      //   if(stop.id == markerStop.id){
      //     stop.lat = newLat;
      //     stop.lng = newLng;
      //   }
      //   return stop;
      // });
      //
      //
      // $scope.directions = $scope.directions.map(function (direction) {
      //   var ok = false;
      //   if(markerStop.id == direction.origin.id) {
      //     direction.origin.lat = newLat;
      //     direction.origin.lng = newLng
      //     ok = true;
      //   }
      //   if(markerStop.id == direction.destination.id) {
      //     direction.destination.lat = newLat;
      //     direction.destination.lng = newLng
      //     ok = true;
      //   }
      //   if(!ok){
      //     direction.wayPoints = direction.wayPoints.map(function(point){
      //       if(point.location.lat == markerStop.lat && point.location.lng == markerStop.lng){
      //         point.location.lat = newLat;
      //         point.location.lng = newLng;
      //       }
      //       return point;
      //     });
      //   }
      //   return direction;
      // });
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