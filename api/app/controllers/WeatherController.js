'use strict';

// Import dependencies
var _s = require('underscore.string');
var URL = require('url');
var WunderNode = require('wundernode');
var Config = require('../utilities/Config');
var ErrorResponse = require('../utilities/ErrorResponse');

/**
 * Controller responsible for handling RESTful interactions involving Weather data
 */
module.exports = function(router) {

  var wunderNode = new WunderNode(Config.wunderground.key, false, 10, 'minute');

  /**
   *
   */
  router.get('/weather/conditions', function(request, response) {
    var location = URL.parse(request.url).query;
    wunderNode.conditions(location, function(error, conditions) {
      if(!error) {
        response.send(conditions);
      }
      else {
        var message = _s.sprintf('An error occurred while attempting to get the conditions for %s.', location);
        ErrorResponse.send(response, 500, message, error);
      }
    });
  });

  /**
   * 
   */
  router.get('/weather/forecast', function(request, response) {
    var location = URL.parse(request.url).query;
    wunderNode.forecast10day(location, function(error, forecast) {
      if(!error) {
        response.send(forecast);
      }
      else {
        var message = _s.sprintf('An error occurred while attempting to get the forecast for %s.', location);
        ErrorResponse.send(response, 500, message, error);
      }
    });
  });

};
