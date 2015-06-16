'use strict';

// Import dependencies
var _s = require('underscore.string');
var URL = require('url');
var Quote = require('../models/Quote');
var ErrorResponse = require('../utilities/ErrorResponse');

/**
 * Controller responsible for handling RESTful interactions involving Finance data
 */
module.exports = function(router) {

  /**
   *
   */
  router.get('/finance/quotes', function(request, response) {
    var symbolsString = URL.parse(request.url).query;
    var symbols = symbolsString.replace(/ /g, '').split(',');
    Quote.getForSymbols(symbols, function(error, quotes) {
      if(!error) {
        response.send(quotes);
      }
      else {
        var message = _s.sprintf('An error occurred while attempting to get financial data for %s.', symbolsString);
        ErrorResponse.send(response, 500, message, error);
      }
    });
  });

};
