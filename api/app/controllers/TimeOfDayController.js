'use strict';

// Import dependencies
var _s = require('underscore.string');
var URL = require('url');
var TimeOfDay = require('../models/TimeOfDay');
var ErrorResponse = require('../utilities/ErrorResponse');

/**
 * Controller responsible for handling RESTful interactions involving Weather data
 */
module.exports = function(router) {

  /**
   *
   */
  router.get('/timeofday', function(request, response) {
    var latitudeAndLongitude = (URL.parse(request.url).query).split(',');
    var latitude = latitudeAndLongitude[0];
    var longitude = latitudeAndLongitude[1];
    TimeOfDay.getForLatitudeAndLongitude(latitude, longitude, function(error, timeOfDay) {
      if(!error) {
        response.send(timeOfDay);
      }
      else {
        var message = _s.sprintf('An error occurred while attempting to get the time of day for %s, %s.', latitude, longitude);
        ErrorResponse.send(response, 500, message, error);
      }
    });
  });

};
