'use strict';

angular.module('trafficCMS.basic')
.factory('fileUploader', function(Upload, API) {
  return {
    upload: function(params) {
      var url = params.url;
      var method = params.method;
      delete params.url;
      delete params.method;
      return Upload.upload({
        method: method || 'POST',
        url: url || API.apiHost + API.apiPath + '/maps/upload-file',
        data: params
      }).then(function(response) {
        return response.data;
      });
    }
  };
});