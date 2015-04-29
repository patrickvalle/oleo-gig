'use strict';

angular.module('app').directive('weatherToday', 
    [function() {

  return {
    replace: true,
    restrict: 'E',
    scope: {
      currently: '@currently'
    },
    templateUrl: 'directives/weather-today/WeatherTodayDirective.html',
    transclude: true
  };
}]);