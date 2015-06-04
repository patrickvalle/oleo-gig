'use strict';

angular.module('app').service('WeatherIconService', 
    ['_s',
    function WeatherIconService(_s) {

  /**
   * Translates the provided conditions and time of day into an icon class 
   * recognizable by http://erikflowers.github.io/weather-icons/.
   */
  this.translateConditionsAndTimeOfDayToIconClass = function(conditions, timeOfDay) {
    var iconClass = 'unknown';
    var mappings = {
      'chancerain': {
        'day': 'wi-day-showers',
        'night': 'wi-night-alt-showers'
      },
      'chancetstorms': {
        'day': 'wi-day-storm-showers',
        'night': 'wi-night-alt-storm-showers'
      },
      'clear': {
        'day': 'wi-day-sunny',
        'night': 'wi-day-sunny'
      },
      'cloudy': {
        'day': 'wi-cloudy',
        'night': 'wi-cloudy'
      },
      'mostlycloudy': {
        'day': 'wi-day-cloudy',
        'night': 'wi-night-cloudy'
      },
      'partlycloudy': {
        'day': 'wi-day-sunny-overcast',
        'night': 'wi-night-cloudy'
      },
      'rain': {
        'day': 'wi-day-rain',
        'night': 'wi-night-alt-rain'
      },
      'tstorms': {
        'day': 'wi-day-thunderstorm',
        'night': 'wi-night-alt-thunderstorm'
      }
    };
    var conditionsMapping = mappings[conditions];
    if(conditionsMapping) {
      timeOfDay = timeOfDay || 'day';
      iconClass = conditionsMapping[timeOfDay];
    }
    if(iconClass === 'unknown') {
      console.log(conditions);
    }
    return iconClass;
  };

  /**
   * Translates the provided conditions and time of day into an icon class 
   * recognizable by http://erikflowers.github.io/weather-icons/.
   */
  this.translateWindDegreesToIconClass = function(degrees) {
  	var increments = 15;
  	degrees = Number(degrees);
  	var delta = degrees - (increments * Math.floor(degrees / increments));
  	if(delta >= 8) {
  		degrees += (15 - delta)
  	}
  	else {
  		degrees -= delta;
  	}
    return _s.sprintf('wi-wind-default _%d-deg', degrees);
  };

}]);