'use strict';

var Params = require('paramatas');
var Suncalc = require('suncalc');

module.exports = function() {

  var getForLatitudeAndLongitude = function(latitude, longitude, callback) {
  	var now = new Date();
  	var times = Suncalc.getTimes(now, latitude, longitude);
  	var sunrise = new Date(times.sunrise);
  	var sunset = new Date(times.sunset);
  	var isTheSunInTheSky = (now >= sunrise && now <= sunset);
  	var timeOfDay = {
  	  timeOfDay: isTheSunInTheSky ? 'day' : 'night',
  	};
  	callback(false, timeOfDay);
  };

  // Public API
  return {
    getForLatitudeAndLongitude: getForLatitudeAndLongitude
  };

}();