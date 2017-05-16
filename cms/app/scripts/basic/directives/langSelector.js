'use strict';

angular.module('trafficCMS.basic')
.directive('langSelector', function($rootScope, $translate, utils) {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/directives/langSelector.html',
    link: function($scope) {
      $scope.selectedLang = $translate.use();
      $scope.langs = utils.langs;
      $scope.$watch('selectedLang', function() {
        $translate.use($scope.selectedLang);
        $rootScope.app.setting.rtl = $scope.langs[$scope.selectedLang].rtl;
      });
    }
  };
});
