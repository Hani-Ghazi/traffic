'use strict';

angular.module('trafficCMS.models', [])
.config(function(RestangularProvider, API) {
  RestangularProvider.setBaseUrl(API.apiHost);
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    var extractedData;
    // .. to look for getList operations
    if (operation === "getList") {
      // .. and handle the data and meta data
      extractedData = data.data || data;
      extractedData.count = data.count || {};
    } else {
      extractedData = data.data || data;
    }
    return extractedData;
  });
})
.factory('models', function(User, Bus, Stop) {
  return {
    user: User,
    bus: Bus,
    stop: Stop
  };
});
