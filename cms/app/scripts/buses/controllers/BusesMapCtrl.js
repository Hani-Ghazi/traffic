angular.module('trafficCMS.buses')
  .controller('BusesMapCtrl', function ($scope, $q, $timeout, busMap, NgMap, models) {
    var promises = [];
    $scope.paths = {};

    NgMap.getMap().then(function (map) {
      $scope.map = map;
    });

    var color = ['#9966ff', '#99ffcc', '#ffa64d', '#ff80ff', '#336600', '#ffff00', '#000000', '#666699', '#dddddd', '#ff9999', '#FFC395', '#900C3F'];
    var sortStops = function (stops) {
      stops.sort(function (a, b) {
        return a.order - b.order;
      });
      return stops;
    };

    var initMap = function (stops) {
      var directions = [];
      var wayPoints = [];
      stops.forEach(function (stop, index) {
        if (index % 9 === 0) {
          if (index) {
            directions[directions.length - 1].destination = stop.stop;
            directions[directions.length - 1].wayPoints = wayPoints;
          }
          directions.push({origin: stop.stop});
          wayPoints = [];
        }
        else {
          wayPoints.push({location: {lat: stop.stop.lat, lng: stop.stop.lng}, stopover: true});
        }
      });

      if (stops.length > 1) {
        directions[directions.length - 1].destination = stops[stops.length - 1].stop;
        directions[directions.length - 1].wayPoints = wayPoints;
      }

      return directions;
    };

    $timeout(function () {
      $scope.busesMap = busMap.map(function (bus, index) {
        bus.stops = sortStops(bus.stops);
        bus.directions = initMap(bus.stops);
        bus.color = color[index];
        return bus;
      });
      console.log($scope.busesMap);
    }, 4000);


  });