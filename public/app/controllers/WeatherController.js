'use strict';

angular.module('app').controller('WeatherController', 
    ['$scope', '$rootScope', 'WeatherService',
    function($scope, $rootScope, WeatherService) {

  var LOCATIONS = ['27705', '08054']; // list of zip codes
  var MAX_FORECAST_RESULTS = 4;       // includes today
  var REFRESH_INTERVAL = 600000;      // in millis (or false for no auto refresh)

  var data = [];

  var initialize = function() {
    loadData();
    if(REFRESH_INTERVAL) {
      setInterval(loadData, REFRESH_INTERVAL);
    }
  };

  var loadData = function(callback) {
    var _callback = callback || _.noop;
    WeatherService.getForecast(LOCATIONS, function(forecasts) {
      console.log('Fetching weather data... success!');
      data = forecasts;
      _callback();
    }, function() {
      console.error('Fetching weather data... failed.');
      _callback();
    });
  };

  this.maxForecastResults = function() { return MAX_FORECAST_RESULTS; };
  this.data = function() { return data; };
  this.loading = function() { return loading; };
  this.onRefresh = function(done) {
    loadData(done);
  };

  initialize();

}]);