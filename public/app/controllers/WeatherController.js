'use strict';

angular.module('app').controller('WeatherController', 
    ['$scope', '$rootScope', 
    function($scope, $rootScope) {

  var initialize = function() {
    console.log('WeatherController...');
  };

  var onRefresh = function(done) {
    setTimeout(function() {
      done();
    }, 6000);
  };

  initialize();

  $scope.onRefresh = onRefresh;
  $scope.today = {};
  $scope.forecast = [];

}]);