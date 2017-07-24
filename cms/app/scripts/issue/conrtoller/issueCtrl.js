

angular.module('trafficCMS.issues')
.controller('issueCtrl', function ($scope, $state, stops, issue) {
  $scope.isNew =angular.isUndefined(issue.id) || issue.id == null || issue.id == '';
  $scope.stops = stops;
  $scope.issue = $scope.isNew ? {} : issue;
  if(!$scope.isNew){
    $scope.issue.origin = _.find($scope.stops, {id: $scope.issue.origin.id});
    $scope.issue.destination = _.find($scope.stops, {id: $scope.issue.destination.id});
  }
  $scope.types = ['danger', 'traffic', 'blocked'];
  $scope.saveIssue = function () {
    $scope.issue.save().then(function () {
      $state.go('app.issues', {
        replace: true
      })
    });
  }

});