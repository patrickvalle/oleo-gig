'use strict';

angular.module('app').controller('FinanceController', 
    ['$scope', '$rootScope', 'FinanceService',
    function($scope, $rootScope, FinanceService) {

  var SYMBOLS = ['TSLA', 'SCTY', 'GOOGL', 'AAPL', 'AMZN', 'MSFT'];
  var REFRESH_INTERVAL = 60000;      // in millis (or false for no auto refresh)

  var data = [];

  var initialize = function() {
    loadData();
    if(REFRESH_INTERVAL) {
      setInterval(loadData, REFRESH_INTERVAL);
    }
  };

  var loadData = function(callback) {
    var _callback = callback || _.noop;
    FinanceService.getQuotes(SYMBOLS, function(quotes) {
      console.log('Fetching finance data... success!');
      data = quotes;
      _callback();
    }, function() {
      console.error('Fetching finance data... failed.');
      _callback();
    });
  };

  this.data = function() { return data; };
  this.onRefresh = function(done) {
    loadData(done);
  };

  initialize();

}]);