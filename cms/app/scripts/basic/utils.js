'use strict';

angular.module('trafficCMS.basic')
.factory('utils', function($filter, $translate, $mdDialog) {
  var tr = $filter('translate');
  var translate = function(str) {
    if (typeof str === 'string') {
      return tr(str);
    }
    else {
      return tr(str.key, str.values);
    }
  };

  var Utils = {
    format: 'YYYY-MM-DD HH:mm:ss'
  };
  Utils.langs = {
    en: {
      id: 1,
      label: 'English',
      labelTranslation: 'global.languages.english',
      rtl: false
    },
    ar: {
      id: 2,
      label: 'العربية',
      labelTranslation: 'global.languages.arabic',
      rtl: true
    }
  };
  // Utils.categories = {
  //   business: {
  //     id: 0,
  //     label: 'Business',
  //     labelTranslation: 'map.categories.business'
  //   },
  //   education: {
  //     id: 1,
  //     label: 'Educational',
  //     labelTranslation: 'map.categories.education'
  //   }
  // };
  // selectLang = $rootScope.langs[$translate.proposedLanguage()] || 'English';
  Utils.setLang = function(langKey) {
    // set the current lang
    // $rootScope.selectLang = langs[langKey];
    // You can change the language during runtime
    $translate.use(langKey);
  };

  Utils.getCurrentLang = function() {
    return Utils.langs[$translate.use()];
  };

  Utils.getErrorMsg = function(model, err) {
    var msg = tr(model + '.errors.saveError');
    if (err.data && err.data.info) {
      var keys = Object.keys(err.data.info);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var trans = model + '.errors.' + key;
        if (tr(trans) !== trans) {
          msg = tr(trans);
          break;
        }
      }
    }
    return msg;
  };

  Utils.confirmDialog = function(params, event) {
    var confirm = $mdDialog.confirm()
          .title(translate(params.title))
          .textContent(translate(params.text))
          .targetEvent(event)
          .ok(translate(params.okButton))
          .cancel(translate(params.cancelButton));
    return $mdDialog.show(confirm);
  };

  return Utils;
});
