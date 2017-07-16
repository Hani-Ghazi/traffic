
angular.module('trafficCMS.login', [])
.config(function($httpProvider, $stateProvider) {
  $httpProvider.interceptors.push('authorizationInterceptor');

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login/login.html',
    controller: 'LoginController',
    resolve: {
      authorization: function($q, $state, session) {
        var deferred = $q.defer();
        // check if the user is already logged in then redirect to dashboard
        session.identity().then(function() {
          $state.go('app.users');
          deferred.reject();
        }, deferred.resolve);

        return deferred.promise;
      }
    }
  }).state('accessDenied', {
    url: '/not-allowed',
    templateUrl: 'views/templates/accessDenied.html',
    resolve: {
      authorize: function(authorization) {
        return authorization.authorize();
      }
    },
    data: {
      requiredPermission: true
    }
  });
})
.run(function($rootScope, $q, $state, session) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    // track the state the user wants to go to; authorization service needs this
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
  });

  $rootScope.logout = function() {
    session.logout();
    $state.go('login');
  };

  $rootScope.goToMainPage = function() {
    if (angular.isDefined($rootScope.returnToState)) {
      $state.go($rootScope.returnToState, $rootScope.returnToStateParams);
      $rootScope.returnToState = undefined;
      $rootScope.returnToStateParams = undefined;
    }
    else {
      $state.go('app.users');
    }
  };
});