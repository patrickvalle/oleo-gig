'use strict';

angular.module('app').service('WeatherService', 
    ['$http', '$q', 
    function WeatherService($http, $q) {
  
  var defaultUnits = 'F';
  var defaultNumberOfDays = 5;
  var getForecastUrl = 'http://localhost:3000/weather/forecast/%s?numberOfDays=%d&units=%s';

  /**
   * The units to use when calculating the degrees of temperature
   */
  this.units = defaultUnits;

  /**
   * The number of days forward to get forecast information for
   */
  this.numberOfDays = defaultNumberOfDays;

  /**
   * Returns a list of forecast objects that correspond to the provided locations.
   *
   * @param locations     An array of location Strings (or a singular String) of the form "Durham, NC"
   * @param onSuccess     The callback to invoke on success of the call
   * @param onFailure     The callback to invoke on failure of the call
   *
   * @return {
   *  locations: [{
   *    location: "",
   *    units: "C|F",
   *    current: {
   *      temperature: 0,
   *      conditions: ""
   *    },
   *    forecasts: [{
   *      date: 0,
   *      conditions: "clear|cloudy|partly cloudy|note sure yet",
   *      low: 0,
   *      high: 0
   *    }]
   *  }]
   * }
   */
  this.getForecast = function(location, onSuccess, onFailure) {
    var location = locations[i];
    var url = sprintf(getForecastUrl, location, this.numberOfDays, this.units);
    $http.get(url, onSuccess, onFailure);
  };

  this.translateConditionsToIconClass = function(conditions) {
    var mappings = {
      'sunny': 'wi-day-sunny'
    };
    return mappings[conditions];
  };

}]);