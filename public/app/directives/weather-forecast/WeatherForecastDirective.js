'use strict';

angular.module('app').directive('weatherForecast', 
    ['WeatherService', function(WeatherService) {
  
  return {
    replace: true,
    restrict: 'E',
    scope: {
      conditions: '@conditions',
      day: '@day',
      date: '@date',
      high: '@high',
      icon: '@icon',
      low: '@low',
      precip: '@precip',
      windDirection: '@windDirection',
      windSpeed: '@windSpeed'
    },
    templateUrl: 'directives/weather-forecast/WeatherForecastDirective.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      var conditions = $attrs.conditions;
      $scope.icon = WeatherService.translateConditionsToIconClass(conditions);
    }
  };
}]);