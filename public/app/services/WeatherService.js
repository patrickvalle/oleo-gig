'use strict';

angular.module('app').service('WeatherService', 
    ['$http', '$q', '_', '_s', 'Config',
    function WeatherService($http, $q, _, _s, Config) {
  
  var getForecastUrl = '//' + Config.server.host + ':' + Config.server.port + Config.api.root + '/weather/forecast?%s';

  /**
   * Returns a list of forecast objects that correspond to the provided locations.
   *
   * @param locations     An array of location Strings (or a singular String) of zip codes
   * @param onSuccess     The callback to invoke on success of the call
   * @param onFailure     The callback to invoke on failure of the call
   */
  this.getForecast = function(locations, onSuccess, onFailure) {
    // Sanitize params
    var _onFailure = onFailure || _.noop;
    var _locations = locations;
    if(_.isString(locations)) {
      _locations = [locations];
    }
    // Synchronize service call and return one success or failure
    if(_.isFunction(onSuccess) && _.isArray(_locations)) {
      var promises = _.map(locations, function(location) {
        var url = _s.sprintf(getForecastUrl, location);
        return $http.get(url);
      });
      $q.all(promises).then(function(responses) {
        var _responses = _.map(responses, function(response) {
          return response.data;
        });
        onSuccess(_responses);
      }, onFailure);
    }
  };

}]);