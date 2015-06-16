'use strict';

var Params = require('paramatas');
var _ = require('lodash');
var Wunderground = require('wundergrounded');
var Config = require('../utilities/Config');

module.exports = function() {

  // Instantiate Wundergrounded service
  var wunderground = new Wunderground(Config.dev).apiKey(Config.wunderground.key).cache().limit();

  var translateWundergroundResponse = function(response) {
    var translatedResponse = response;
    if(response) {
      translatedResponse = {
        location: {
          name: response.current_observation.display_location.full,
          latitude: response.current_observation.display_location.latitude,
          longitude: response.current_observation.display_location.longitude,
          zip: response.current_observation.display_location.zip
        },
        current: {
          temperature: {
            f: Math.floor(response.current_observation.temp_f),
            c: Math.floor(response.current_observation.temp_c)
          },
          icon: response.current_observation.icon,
          conditions: response.current_observation.weather,
          wind: {
            mph: response.current_observation.wind_mph,
            kph: response.current_observation.wind_kph,
            degrees: response.current_observation.wind_degrees,
            direction: response.current_observation.wind_dir
          }
        },
        forecast: [
        ]
      };
      for(var i = 0; i < response.forecast.simpleforecast.forecastday.length; i++) {
        var forecastday = response.forecast.simpleforecast.forecastday[i];
        translatedResponse.forecast.push({
          date: new Date(forecastday.date.epoch * 1000),
          icon: forecastday.icon,
          conditions: forecastday.conditions,
          low: {
            f: Math.floor(Number(forecastday.low.fahrenheit)),
            c: Math.floor(Number(forecastday.low.celsius))
          },
          high: {
            f: Math.floor(Number(forecastday.high.fahrenheit)),
            c: Math.floor(Number(forecastday.high.celsius))
          },
          precipitation: forecastday.pop,
          wind: {
            mph: forecastday.avewind.mph,
            kph: forecastday.avewind.kph,
            degrees: forecastday.avewind.degrees,
            direction: forecastday.avewind.dir,
          }
        });
      }
    }
    return translatedResponse;
  };

  var getForLocation = function(location, callback) {
  	// Sanitize params
  	Params.required('location', location, String).required('callback', callback, Function);
  	// Call Wunderground API
  	wunderground.conditions().forecast10day().request(location, function(error, response) {
      if(!error) {
        response = translateWundergroundResponse(response);
        callback(false, response);
      }
      else {
        callback(error);
      }
    });
  };

  // Public API
  return {
    getForLocation: getForLocation
  };

}();