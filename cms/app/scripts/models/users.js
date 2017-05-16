'use strict';

angular.module('trafficCMS.models')
.factory('User', function(Restangular) {
  var route = 'users';
  var User = Restangular.all(route);
  User.getCurrentUser = function() {
    return Restangular.one(route).customGET('me');
  };
  User.deactivateUser = function(user) {
    return Restangular.one(route).customPUT(undefined, user.id + '/activate');
  };
  User.changePassword = function(oldPass, newPass) {
    return Restangular.one(route).customPUT({
      oldPassword: oldPass,
      newPassword: newPass
    }, '/change_password');
  };
  return User;
});