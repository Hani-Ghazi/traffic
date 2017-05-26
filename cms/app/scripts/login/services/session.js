'use strict';

angular.module('trafficCMS.login')
.factory('session', function($q, $rootScope, $http, $parse, $filter, $state, $localStorage, API, models) {
  var _identity;

  // this function is used to add role and permission data to current user only
  var createUser = function(userData) {
    var isAdmin = userData.role === 'admin';

    var user = {
      isAdmin: isAdmin,
      permissions: {
        users: {
          list: isAdmin,
          view: isAdmin,
          edit: isAdmin
        }
      }
    };

    _identity = _.assign(userData, user);
    return _identity;
  };

  var getIdentity = function() {
    var deferred = $q.defer();
    models.user.getCurrentUser().then(function(currentUser) {
      deferred.resolve(createUser(currentUser));
    }, deferred.reject);
    return deferred.promise;
  };

  var refreshToken = function(force) {
    var deferred = $q.defer();
    deferred.resolve();
    return deferred.promise;
  };

  return {
    login: function(authField, password) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: API.apiHost + '/users/login',
        data: {
          authField: authField,
          password: password
        },
        noToken: true
      }).then(function(response) {
        var user = createUser(response.data);
        $rootScope.currentUser = user;
        $localStorage.token = user.token;
        deferred.resolve(user);
      }, deferred.reject);
      return deferred.promise;
    },
    logout: function() {
      _identity = undefined;
      $localStorage.token = $rootScope.currentUser = undefined;
      $state.go('login');
    },
    isAuthenticated: function() {
      // TODO: find a way to check for authentication
      // return true;
      return angular.isDefined($localStorage.token);
    },
    isIdentityResolved: function() {
      return this.isAuthenticated() && angular.isDefined(_identity);
    },
    hasPermission: function(state) {
      if (!this.isIdentityResolved()) {
        return false;
      }

      if (angular.isUndefined(state.data)) {
        return false;
      }
      var requiredPermission = state.data.requiredPermission;
      if (typeof requiredPermission === 'boolean') {
        return requiredPermission;
      }
      return $parse('permissions.' + requiredPermission)(_identity);
    },
    identity: function(force) {
      var deferred = $q.defer();

      if (!this.isAuthenticated()) {
        deferred.reject();
        return deferred.promise;
      }
      if (force === true) {
        _identity = undefined;
      }

      // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
      if (this.isIdentityResolved()) {
        deferred.resolve(_identity);
        return deferred.promise;
      }

      // refreshToken(force).then(function() {
      getIdentity().then(function(user) {
        _identity = user;
        deferred.resolve(_identity);
      }, function(err) {
        console.log(err);
        _identity = undefined;
        $localStorage.token = $rootScope.currentUser = undefined;
        deferred.reject(err);
      });

      return deferred.promise;
    }
  };
});