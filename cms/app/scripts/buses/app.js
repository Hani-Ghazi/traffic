'use strict';

angular.module('trafficCMS.buses', [])
  .config(function($stateProvider) {
    $stateProvider.state('app.buses', {
      url: '/buses?page&count',
      templateUrl: 'views/buses/buses-page.html',
      controller: 'BusesCtrl',
      data: {
        requiredPermission: 'buses.list'
      },
      resolve: {
        authorize: function (authorization) {
          return authorization.authorize();
        }
      }
    }).state('app.bus', {
      url: '/buses/:busId',
      templateUrl: 'views/buses/bus-page.html',
      controller: 'BusCtrl',
      params: {
        bus: null
      },
      data: {
        requiredPermission: 'buses.edit',
        child: true
      },
      resolve: {
        user: function($rootScope, $q, $state, $stateParams, authorization, models) {
          return authorization.authorize().then(function() {
            var deferred = $q.defer();
            if (angular.isDefined($stateParams.bus) && $stateParams.bus !== null) {
              deferred.resolve($stateParams.bus.clone ? $stateParams.user.clone() : angular.copy($stateParams.user));
            }
            else if (angular.isUndefined($stateParams.busId) || $stateParams.busId === '' || $stateParams.busId === null) {
              $state.go('app.buses', {}, {
                location: 'replace'
              });
              deferred.reject();
            }
            else if ($stateParams.busId === 'new') {
              deferred.resolve(models.bus.one(''));
            }
            else {
              models.bus.get($stateParams.busId).then(function(bus) {
                deferred.resolve(bus);
              }, deferred.reject);
            }
            return deferred.promise;
          });
        }
      }
    });
  });