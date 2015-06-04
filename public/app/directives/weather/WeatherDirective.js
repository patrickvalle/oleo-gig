'use strict';

angular.module('app').directive('weather', 
    ['WeatherIconService', function(WeatherIconService) {

  return {
    replace: true,
    restrict: 'E',
    scope: {
      conditions: '@conditions',
      conditionsIcon: '@conditionsIcon',
      location: '@location',
      zip: '@zip',
      temperature: '@temperature',
      windDirection: '@windDirection',
      windIcon: '@windIcon',
      windSpeed: '@windSpeed'
    },
    templateUrl: 'directives/weather/WeatherDirective.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      var icon = $attrs.icon;
      var timeOfDay = $attrs.timeOfDay;
      var windDegrees = $attrs.windDegrees;
      $scope.conditionsIcon = WeatherIconService.translateConditionsAndTimeOfDayToIconClass(icon, timeOfDay);
      $scope.windIcon = WeatherIconService.translateWindDegreesToIconClass(windDegrees);
    }
  };
}]);