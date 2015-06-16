'use strict';

angular.module('app').service('FinanceService', 
    ['$http', '$q', '_', '_s',
    function FinanceService($http, $q, _, _s) {
  
  var GET_QUOTES_URL = '/api/finance/quotes?%s';

  /**
   * Returns a list of forecast objects that correspond to the provided locations.
   *
   * @param locations     An array of location Strings (or a singular String) of zip codes
   * @param onSuccess     The callback to invoke on success of the call
   * @param onFailure     The callback to invoke on failure of the call
   */
  this.getQuotes = function(symbols, onSuccess, onFailure) {
    // Sanitize params
    var _onFailure = onFailure || _.noop;
    var _symbols = symbols;
    if(_.isString(symbols)) {
      _symbols = [symbols];
    }
    // Make service call
    if(_.isFunction(onSuccess) && _.isArray(_symbols)) {
      var url = _s.sprintf(GET_QUOTES_URL, _symbols.toString());
      $http.get(url).success(onSuccess).error(onFailure);
    }
  };

}]);