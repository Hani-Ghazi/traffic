'use strict';

module.exports = {
  newError : function (json) {
    var error = new Error((json || {}).error);
    error.jsonObj = json;
    error.status = (json || {}).status || 500;
    return error;
  },
  toJSON : function (json) {
    return json || {};
  },
  toString: function (json) {
    return JSON.stringify(json || {});
  }
};
