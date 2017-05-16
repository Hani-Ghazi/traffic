'use strict';

angular.module('trafficCMS.basic')
.directive('ngTablePagerRtl', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $rootScope.$watch('app.setting.rtl', function(rtl) {
        if (rtl === false) {
          $(element).removeClass('rtl');
        }
        else {
          $(element).addClass('rtl');
        }
      });
    }
  };
})
.directive('ngTableCountRtl', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $rootScope.$watch('app.setting.rtl', function(rtl) {
        if (rtl === true) {
          $(element).removeClass('pull-right');
        }
        else {
          $(element).addClass('pull-right');
        }
      });
    }
  };
})
.directive('prevPage', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $rootScope.$watch('app.setting.rtl', function(rtl) {
        if (rtl === false) {
          element.addClass('mdi-navigation-chevron-left').removeClass('mdi-navigation-chevron-right');
        }
        else {
          element.addClass('mdi-navigation-chevron-right').removeClass('mdi-navigation-chevron-left');
        }
      });
    }
  };
})
.directive('nextPage', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $rootScope.$watch('app.setting.rtl', function(rtl) {
        if (rtl === false) {
          element.addClass('mdi-navigation-chevron-right').removeClass('mdi-navigation-chevron-left');
        }
        else {
          element.addClass('mdi-navigation-chevron-left').removeClass('mdi-navigation-chevron-right');
        }
      });
    }
  };
});
