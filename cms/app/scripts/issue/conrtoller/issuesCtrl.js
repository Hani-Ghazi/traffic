angular.module('trafficCMS.issues')
  .controller('issuesCtrl', function ($scope, $mdDialog, $stateParams, $state, NgTableParams, models) {
    $scope.isLoading = true;
    $scope.issuesTable = new NgTableParams({
      page: $stateParams.page || 1,
      count: $stateParams.count || 10,
    }, {
      getData: function (params) {
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
        return models.issue.getList({
          offset: offset,
          limit: params.count()
        }).then(function (issues) {
          $scope.isLoading = false;
          params.total(issues.count);
          return issues;
        }, function (err) {
          $scope.isLoading = false;
          $scope.isError = true;
        });
      }
    });

    $scope.close = function (issue) {

    }
  });