'use strict';

angular.module('trafficCMS.i18n', [])
.config(function($translateProvider, en, ar) {
  $translateProvider.translations('en', en);
  $translateProvider.translations('ar', ar);
  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');
  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();
});
