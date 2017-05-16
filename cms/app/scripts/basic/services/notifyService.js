'use strict';

angular.module('trafficCMS.basic')
.service('notifyService', function($rootScope) {
  return {
    notify: function(message, options) {
      var direction = $rootScope.app.setting.rtl ? 'left' : 'right';
      var animateIn = $rootScope.app.setting.rtl ? 'fadeInLeft' : 'fadeInRight';
      var animateOut = $rootScope.app.setting.rtl ? 'fadeOutLeft' : 'fadeOutRight';
      options = options || {};
      var type = options.type || 'success';
      var from = options.from || 'bottom';
      var align = options.align || direction;
      var enter = options.animationIn || 'animated ' + animateIn;
      var exit = options.animationOut || 'animated ' + animateOut;

      $.notify({
        message: message
      }, {
        type: type,
        allow_dismiss: true,
        placement: {
          from: from,
          align: align
        },
        delay: 3000,
        animate: {
          enter: enter,
          exit: exit
        },
        offset: {
          x: 20,
          y: 25
        }
      });
    }
  };
});