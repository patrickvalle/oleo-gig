'use strict';

angular.module('app').directive('weather', 
    ['WeatherService', function(WeatherService) {

  return {
    replace: true,
    restrict: 'E',
    scope: {
      conditions: '@conditions',
      icon: '@icon',
      location: '@location',
      temperature: '@temperature'
    },
    templateUrl: 'directives/weather/WeatherDirective.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      var conditions = $attrs.conditions;
      $scope.icon = WeatherService.translateConditionsToIconClass(conditions);
    }
  };
}]);