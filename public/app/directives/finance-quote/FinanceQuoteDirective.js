'use strict';

angular.module('app').directive('financeQuote', 
    [function() {

  var NEGATIVE_CLASS = 'negative';
  var POSITIVE_CLASS = 'positive';

  return {
    replace: true,
    restrict: 'E',
    scope: {
      symbol: '@symbol',
      price: '@price',
      changeDollar: '@changeDollar',
      changePercent: '@changePercent',
      changeClass: '@changeClass',
      yearHigh: '@yearHigh',
      yearLow: '@yearLow',
      graphPercentage: '@graphPercentage'
    },
    templateUrl: 'directives/finance-quote/FinanceQuoteDirective.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      // Scrape attributes
      var change = $attrs.changeDollar;
      var price = $attrs.price;
      var yearLow = $attrs.yearLow;
      var yearHigh = $attrs.yearHigh;
      // Determine css class for change $/%
      if(Number(change) < 0) {
      	$scope.changeClass = NEGATIVE_CLASS;
      }
      else if(Number(change) > 0) {
      	$scope.changeClass = POSITIVE_CLASS;
      }
      // Determine graph numbers
      var difference = Number(yearHigh) - Number(yearLow);
      var priceAboveYearLow = Number(price) - Number(yearLow);
      $scope.graphPercentage = Math.floor((priceAboveYearLow / difference) * 100);
    }
  };
}]);