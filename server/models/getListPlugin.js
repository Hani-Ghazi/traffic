const Promise = require('bluebird');

/**
 * A mongoose plugin that adds a single static method to the schema `getList`
 * which returns the count and data for some requested query
 */
module.exports = exports = function getListPlugin(schema, options) {
  /**
   * @param {object} [query] The query to apply
   * @param {number} [skip] The offset
   * @param {number} [limit] The limit
   * @param {string} [projection] The projection applied to the query
   * @param {object[]} [populate]
   * @returns {
   *   data: Array,
   *   count: Number
   * }
   */
  schema.statics.getList = function(params) {
    var query = this.find(params.query, params.projection);
    if (params.populate) {
      if (Array.isArray(params.populate)) {
        params.populate.forEach(function(populate){
          query.populate(populate);
        })
      }
      else {
        query.populate(params.populate);
      }
    }
    return Promise.props({
      data: query.skip(params.skip).limit(params.limit),
      count: this.count(params.query)
    });
  };
};
