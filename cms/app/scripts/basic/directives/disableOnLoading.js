'use strict';

angular.module('trafficCMS.basic')
.directive('disableOnLoading', function() {
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      var loadingExp = attrs.disableOnLoading;
      var disabledElements = [];

      var disableCompontents = function(value) {
        if (value === true) {
          // retrieve all enabled elements to disable them and save them to an array
          disabledElements = element.find(':enabled');
          disabledElements.each(function(index, elem) {
            $(elem).prop('disabled', true);
          });
        }
        else {
          // loop through previously disabled elements to enable them
          // not using `element.find(':disabled')` to avoid inputs that are disabled before this code runs
          disabledElements.each(function(index, elem) {
            $(elem).prop('disabled', false);
          });
          disabledElements = [];
        }
      };

      // disable the elements if the value is true for the first time
      // disableCompontents($scope.$eval(loadingExp));
      $scope.$watch(loadingExp, function(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }

        disableCompontents(newVal);
      });
    }
  };
});