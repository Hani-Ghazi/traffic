'use strict';

/**
 * @ngdoc overview
 * @name trafficCMS
 * @description
 * # trafficCMS
 *
 * Main module of the application.
 */
angular.module('trafficCMS', [
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngSanitize',
  'ngMaterial',
  'ngMap',
  'ngStorage',
  'ui.router',
  'ui.utils',
  'uiGmapgoogle-maps',
  'ui.map',
  'ui.bootstrap',
  'pascalprecht.translate',
  'restangular',
  'angular-loading-bar',
  'ngTable',
  'FBAngular',
  'ngFileUpload',
  'trafficCMS.config',
  'trafficCMS.i18n',
  'trafficCMS.models',
  'trafficCMS.login',
  'trafficCMS.basic',
  'trafficCMS.users',
  'trafficCMS.buses',
  'trafficCMS.stops'
]).constant('_', _)
  .config(function($stateProvider, $urlRouterProvider, $localStorageProvider, $mdDateLocaleProvider) {
  $localStorageProvider.setKeyPrefix('trafficCMS');
  $urlRouterProvider.otherwise('/app/users');
  $stateProvider.state('app', {
    abstract: true,
    url: '/app',
    views: {
      '': {
        templateUrl: 'views/templates/layout.html'
      },
      'aside': {
        templateUrl: 'views/templates/aside.html'
      },
      'content': {
        templateUrl: 'views/templates/content.html'
      }
    }
  });

  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('YYYY-MM-DD');
  };
  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'YYYY-MM-DD HH:mm:ss', true);
    return m.isValid() ? m.toDate() : new Date();
  };
})
.run(function($rootScope, $state, $stateParams, $localStorage, $window, $document, $location, $timeout, $mdSidenav, $mdColorPalette, $anchorScroll, Fullscreen, ngTableDefaults) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  // add 'ie' classes to html
  var isSmartDevice = function($window) {
    // Adapted from http://www.detectmobilebrowsers.com
    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
  };

  var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
  if (isIE) {
    angular.element($window.document.body).addClass('ie');
  }
  if (isSmartDevice($window)) {
    angular.element($window.document.body).addClass('smart');
  }
  // config
  $rootScope.app = {
    name: 'Traffic',
    version: '1.0.2',
    // for chart colors
    color: {
      primary: '#3f51b5',
      info: '#2196f3',
      success: '#4caf50',
      warning: '#ffc107',
      danger: '#f44336',
      accent: '#7e57c2',
      white: '#ffffff',
      light: '#f1f2f3',
      dark: '#475069'
    },
    setting: {
      theme: {
        primary: 'bg-white',
        accent: 'green',
        warn: 'teal'
      },
      asideFolded: false,
      rtl: false
    },
    search: {
      content: '',
      show: false
    }
  };

  $rootScope.toggleFullscreen = function() {
    if (Fullscreen.isEnabled()) {
      Fullscreen.cancel();
    }
    else {
      Fullscreen.all();
    }
  };

  $rootScope.setTheme = function(theme) {
    $rootScope.app.setting.theme = theme;
  };

  // save settings to local storage
  if (angular.isDefined($localStorage.appSetting)) {
    $rootScope.app.setting = $localStorage.appSetting;
  }
  else {
    $localStorage.appSetting = $rootScope.app.setting;
  }
  $rootScope.$watch('app.setting', function() {
    $localStorage.appSetting = $rootScope.app.setting;
  }, true);

  $rootScope.getColor = function(color, hue) {
    if (color === 'bg-dark' || color === 'bg-white') {
      return $rootScope.app.color[color.substr(3, color.length)];
    }
    return rgb2hex($mdColorPalette[color][hue].value);
  };

  //Function to convert hex format to a rgb color
  function rgb2hex(rgb) {
    return '#' + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
  }

  function hex(x) {
    var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'); 
    return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  }

  var openPage = function() {
    $rootScope.app.search.content = '';
    $rootScope.app.search.show = false;
    $rootScope.closeAside();
    // goto top
    $location.hash('view');
    $anchorScroll();
    $location.hash('');
  };

  $rootScope.$on('$stateChangeSuccess', openPage);


  $rootScope.goBack = function() {
    $window.history.back();
  };

  $rootScope.openAside = function() {
    $timeout(function() {
      $mdSidenav('aside').open();
    });
  };

  $rootScope.closeAside = function() {
    $timeout(function() {
      if ($document.find('#aside').length) {
        $mdSidenav('aside').close();
      }
    });
  };
  $rootScope.goToProfilePage = function() {
    if ($rootScope.currentUser) {
      $state.go('app.user', {
        user: $rootScope.currentUser,
        userId: $rootScope.currentUser.id
      });
    }
  };

  ngTableDefaults.settings.paginationMaxBlocks = 7;
  // ngTableDefaults.settings.counts = [];
});