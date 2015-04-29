'use strict';

angular.module('app').directive('weatherOutlook', 
    [function() {

  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'directives/weather-outlook/WeatherOutlookDirective.html',
    transclude: true
  };

}]);