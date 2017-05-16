'use strict';

angular.module('trafficCMS.basic')
.directive('widget', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'views/home/directives/widget.html',
    scope: {
      icon: '=',
      value: '=',
      label: '='
    },
    link: function(scope) {
      $rootScope.$watch('app.setting.rtl', function() {
        scope.rtl = $rootScope.app.setting.rtl;
      });
    }
  };
});
