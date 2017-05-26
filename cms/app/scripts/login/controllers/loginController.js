'use strict';

angular.module('trafficCMS.login')
.controller('LoginController', function($rootScope, $scope, $filter, $localStorage, session) {
  $scope.authField = '';
  $scope.password = '';
  $scope.errorMessage = '';
  $scope.errorLogin = false;
  $scope.isLoading = false;

  $scope.login = function() {
    if ($scope.isLoading) {
      return;
    }

    $scope.isLoading = true;
    $scope.errorLogin = false;
    session.login($scope.authField, $scope.password).then(function(currentUser) {
      $scope.isLoading = false;
      $rootScope.goToMainPage();
    }, function(err) {
      $scope.isLoading = false;
      $scope.errorLogin = true;
      var errMsg = 'login.error.failed';
      if (err.data && err.data.code === 103) {
        errMsg = 'login.error.notActvive';
      }
      $scope.errorMessage = $filter('translate')(errMsg);
    });
  };
});