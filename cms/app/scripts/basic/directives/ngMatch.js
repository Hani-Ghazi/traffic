'use strict';

angular.module('trafficCMS.basic')
  .directive('ngMatch', function ($parse) {
    var directiveId = 'ngMatch';
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) return;
        if (!attrs[directiveId]) return;

        var firstPassword = $parse(attrs[directiveId]);

        var validator = function (value) {
          var temp = firstPassword(scope),
            v = value === temp;
          ctrl.$setValidity('match', v);
          return value;
        }

        ctrl.$parsers.unshift(validator);
        ctrl.$formatters.push(validator);
        attrs.$observe(directiveId, function () {
          validator(ctrl.$viewValue);
        });
      }
    };
  });