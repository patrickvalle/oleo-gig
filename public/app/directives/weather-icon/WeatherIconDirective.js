'use strict';

angular.module('app').directive('weatherIcon', 
    [function() {

  var mappings = {
    'clear': {css: 'wi-day-sunny', title: 'Sunny'},
    'cloudy': {css: 'wi-cloudy', title: 'Cloudy'},
    'fog': { css: 'wi-fog', title: 'Fog' },
    'partly cloudy': {css: 'wi-day-sunny-overcast', title: 'Partly Cloudy'},
    'rain': {css: 'wi-rain', title: 'Rain'},
    'snow': {css: 'wi-snow', title: 'Snow'},
    'thunderstorm': {css: 'wi-thunderstorm', title: 'Thunderstorms'}
  };

  return {
    replace: true,
    restrict: 'E',
    scope: {
      type: "@type"
    },
    templateUrl: 'directives/weather-icon/WeatherIconDirective.html',
    link: function($scope, $element, attrs) {
      var type = $scope.type;
      var mapping = mappings[type];
      $scope.css = mapping.css;
      $scope.title = mapping.title;
    }
  };

}]);