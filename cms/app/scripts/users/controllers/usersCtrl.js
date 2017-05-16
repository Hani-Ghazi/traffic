'use strict';

angular.module('trafficCMS.users')
.controller('UsersCtrl', function($rootScope, $scope, $filter, $state, $stateParams, NgTableParams, models, utils, notifyService) {
  $scope.usersTable = new NgTableParams({
    page: $stateParams.page || 1,
    count: 10,
    filter: $scope.filter
  }, {
    getData: function(params) {
      $scope.isLoading = true;
      $scope.isError = false;
      if (!$state.is($state.current, {
          page: params.page(),
          count: params.count()
        })) {
        $state.go($state.current.name, {
          page: params.page(),
          count: params.count()
        }, {
          notify: false
        });
      }
      var offset = (params.page() - 1) * params.count();
      return models.user.getList({
        offset: offset,
        limit: params.count()
      }).then(function(users) {
        $scope.isLoading = false;
        params.total(users.count);
        return users;
      }, function(err) {
        $scope.isLoading = false;
        $scope.isError = true;
      });
    }
  });

  $scope.deactivateUser = function(user) {
    if (user.username === 'admin') {
      return notifyService.notify($filter('translate')('user.deactivate.admin'), {
        type: 'danger'
      });
    }
    if (user.username === $rootScope.currentUser.username) {
      return notifyService.notify($filter('translate')('user.deactivate.yourself'), {
        type: 'danger'
      });
    }
    var msg = 'user.deactivate.title';
    var text = 'user.deactivate.text';
    var successMsg = 'user.deactivate.success';
    var errorMsg = 'user.deactivate.error';
    if (!user.isActive) {
      msg = 'user.activate.title';
      text = 'user.activate.text';
      successMsg = 'user.activate.success';
      errorMsg = 'user.activate.error';
    }
    utils.confirmDialog({
      title: msg,
      text: {
        key: text,
        values: {
          username: user.username
        }
      },
      okButton: 'user.deactivate.ok',
      cancelButton: 'user.deactivate.cancel'
    }).then(function() {
      return models.user.deactivateUser(user);
    }).then(function(user) {
      $scope.usersTable.reload();
      notifyService.notify($filter('translate')(successMsg, {
        username: user.username
      }));
    }, function(err) {
      // user canceled
      if (angular.isUndefined(err)) {
        return;
      }
      console.log(err);
      notifyService.notify($filter('translate')(errorMsg), {
        type: 'danger'
      });
    });
  };
});