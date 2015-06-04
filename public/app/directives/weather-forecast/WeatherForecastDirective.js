'use strict';

angular.module('app').directive('weatherForecast', 
    ['WeatherIconService', function(WeatherIconService) {
  
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return {
    replace: true,
    restrict: 'E',
    scope: {
      conditions: '@conditions',
      day: '@day',
      dateFormatted: '@dateFormatted',
      high: '@high',
      conditionsIcon: '@conditionsIcon',
      low: '@low',
      precip: '@precip'
    },
    templateUrl: 'directives/weather-forecast/WeatherForecastDirective.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      // Scrape attributes
      var date = $attrs.date;
      var icon = $attrs.icon;
      var timeOfDay = $attrs.timeOfDay;
      // Get the icons for conditions and wind direction
      $scope.conditionsIcon = WeatherIconService.translateConditionsAndTimeOfDayToIconClass(icon, timeOfDay);
      // Get the day and formatted date from the raw date
      date = new Date(date);
      $scope.day = days[date.getDay()];
      $scope.dateFormatted = (date.getMonth() + 1) + '/' + date.getDate();
    }
  };
}]);