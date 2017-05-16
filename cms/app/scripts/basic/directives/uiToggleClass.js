'use strict';

angular.module('trafficCMS.basic')
.directive('uiToggleClass', function($timeout, $document) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {
      el.on('click', function(e) {
        e.preventDefault();
        var classes = attr.uiToggleClass.split(',');
        var targets = (attr.target && attr.target.split(',')) || new Array(el);
        var key = 0;
        angular.forEach(classes, function(_class) {
          var target = targets[(targets.length && key)];
          $(target).toggleClass(_class);
          key++;
        });
        el.toggleClass('active');
      });
    }
  };
});
