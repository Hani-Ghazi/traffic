'use strict';

angular.module('trafficCMS.stops', [])
  .config(function($stateProvider) {
    $stateProvider.state('app.stops', {
      url: '/stops',
      templateUrl: 'views/stops/stops-page.html',
      controller: 'StopsCtrl',
      data: {
        requiredPermission: 'stops.list'
      },
      resolve: {
        authorize: function (authorization) {
          return authorization.authorize();
        }
      }
    }).state('app.stop', {
      url: '/stops/:stopId',
      templateUrl: 'views/stops/stop-page.html',
      controller: 'StopCtrl',
      params: {
        stop: null
      },
      data: {
        requiredPermission: 'stops.edit',
        child: true
      },
      resolve: {
        stop: function($rootScope, $q, $state, $stateParams, authorization, models) {
          return authorization.authorize().then(function() {
            var deferred = $q.defer();
            if (angular.isDefined($stateParams.stop) && $stateParams.stop !== null) {
              deferred.resolve($stateParams.stop.clone ? $stateParams.stop.clone() : angular.copy($stateParams.stop));
            }
            else if (angular.isUndefined($stateParams.stopId) || $stateParams.stopId === '' || $stateParams.stopId === null) {
              $state.go('app.stops', {}, {
                location: 'replace'
              });
              deferred.reject();
            }
            else if ($stateParams.stopId === 'new') {
              deferred.resolve(models.stop.one(''));
            }
            else {
              models.stop.getStopById($stateParams.stopId).then(function(stop) {
                deferred.resolve(stop);
              }, deferred.reject);
            }
            return deferred.promise;
          });
        },
        googleApi: function () {
          return loadGoogleMaps();
        }
      }
    });
  });