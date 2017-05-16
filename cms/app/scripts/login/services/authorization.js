'use strict';

angular.module('trafficCMS.login')
.factory('authorization', function($rootScope, $location, $q, $state, session) {
  return {
    authorize: function(force) {
      var deferred = $q.defer();
      session.identity(force || false).then(function(ident) {
        $rootScope.currentUser = ident;
        var isAuthenticated = session.isAuthenticated();

        if (!session.hasPermission($rootScope.toState)) {
          // if (isAuthenticated) {
            deferred.reject();
            $state.go('accessDenied'); // user is logged in but not authorized for desired state
        }
        else {
          deferred.resolve();
        }
      }, function() {
        // user is not authenticated. stow the state they wanted before you
        // send them to the login state, so you can return them when you're done
        $rootScope.returnToState = $rootScope.toState;
        $rootScope.returnToStateParams = $rootScope.toStateParams;

        // now, send them to the login state so they can log in
        deferred.reject();
        $state.go('login');
      });
      return deferred.promise;
    }
  };
});