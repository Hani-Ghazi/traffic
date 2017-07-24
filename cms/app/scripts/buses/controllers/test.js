angular.module('trafficCMS.buses')
  .controller('BusesMapCtrltest', function ($scope, $q, $timeout, busMap, NgMap, models) {

    var MAP;
    var mapOptions = {
      zoom: 10
    };
    //Make the map
    MAP = new google.maps.Map(document.getElementById('map'), mapOptions);
    var directionsService = new google.maps.DirectionsService();
    // var Panel = document.getElementById('directionsPanel');
    var x = 1;
    var getDirections = function (direction, render, stops) {
      //https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRequest
      var request = {
        travelMode: google.maps.TravelMode.DRIVING,
        origin: direction.origin.lat + ', ' + direction.origin.lng,
        destination: direction.destination.lat + ', ' + direction.destination.lng,
        waypoints: direction.wayPoints
      };

      //https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsService
      $timeout(function () {
        directionsService.route(request, function (result, status) {
          render.setDirections(result);
        });
        stops.forEach(function (stop) {
          new google.maps.Marker({
            position: new google.maps.LatLng(stop.stop.lat, stop.stop.lng),
            map: MAP,
            title: stop.stop.arName
          });
        });
      }, 1000 * (x++));

    }

    var color = ['#9966ff', '#99ffcc', '#ffa64d', '#ff80ff', '#336600', '#ffff00', '#000000', '#666699', '#dddddd', '#ff9999', '#FFC395', '#900C3F'];
    var sortStops = function (stops) {
      stops.sort(function (a, b) {
        return a.order - b.order;
      });
      return stops;
    };

    var initMap = function (stops, color) {
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

      return directions.map(function (row) {
        return {
          directions: row,
          stops: stops,
          render: new google.maps.DirectionsRenderer({
            map: MAP,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: color
            }
          })
        }
      });
    };

    var initialize = function () {
      $scope.busesMap.forEach(function (busMap) {
        busMap.directionsObjs.forEach(function (directionsObj) {
          getDirections(directionsObj.directions, directionsObj.render, directionsObj.stops);
        })
      });
    }

    $scope.busesMap = busMap.map(function (bus, index) {
      bus.stops = sortStops(bus.stops);
      bus.directionsObjs = initMap(bus.stops, color[index]);
      bus.color = color[index];
      return bus;
    });
    initialize();

    //Set up the map


  });
