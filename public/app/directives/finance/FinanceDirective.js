'use strict';

angular.module('app').directive('finance', 
    [function() {

  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'directives/finance/FinanceDirective.html',
    transclude: true
  };
}]);