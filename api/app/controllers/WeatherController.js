'use strict';

// Import dependencies
var _s = require('underscore.string');
var URL = require('url');
var TimeOfDay = require('../models/TimeOfDay');
var Weather = require('../models/Weather');
var ErrorResponse = require('../utilities/ErrorResponse');

/**
 * Controller responsible for handling RESTful interactions involving Weather data
 */
module.exports = function(router) {

  /**
   *
   */
  router.get('/weather/forecast', function(request, response) {
    var location = URL.parse(request.url).query;
    Weather.getForLocation(location, function(error, weather) {
      if(!error) {
        var latitude = weather.location.latitude;
        var longitude = weather.location.longitude;
        TimeOfDay.getForLatitudeAndLongitude(latitude, longitude, function(error, timeOfDay) {
          weather.current.timeOfDay = timeOfDay.timeOfDay;
          response.send(weather);
        });
      }
      else {
        var message = _s.sprintf('An error occurred while attempting to get the forecast for %s.', location);
        ErrorResponse.send(response, 500, message, error);
      }
    });
  });

};
