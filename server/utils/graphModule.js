const models = require('../models');
const Promise = require('bluebird');
var config = require('../config/config');
var GoogleMapsApi = require('googlemaps');
var gmAPI;

var publicConfig = {
  key: config.map.APIKEY,
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             false // use https
};

function initMap(){
  gmAPI = new GoogleMapsApi(publicConfig);
}

function getDistance(origins, destinations){
  var params = {
    origins: origins,
    destinations: destinations,
    travelMode: 'DRIVING'
  };
  gmAPI.distance(params, function(err, result){
    if(err){
      console.log("error", err);
      return ;
    }
    console.log("result", result);
  });
}

module.exports = {
  updateGraphWieghts : function(){
    if(!gmAPI)
      initMap();
    models.stop.find({}).then(function(stops){
      getDistance('33.513489,36.28987|33.513819, 36.295341', '33.531625, 36.240269');
    });
  },
  test: function(){

  }
}