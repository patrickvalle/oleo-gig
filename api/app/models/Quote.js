'use strict';

var _ = require('lodash');
var Params = require('paramatas');
var YahooFinance = require('yahoo-finance');
var Config = require('../utilities/Config');

module.exports = function() {

  var translateYahooFinanceResponse = function(response) {
  	console.log(response);
    var translatedResponse = [];
    if(response) {
      for(var i = 0; i < response.length; i++) {
      	var responseItem = response[i];
      	translatedResponse.push({
      		symbol: responseItem.symbol,
      		price: responseItem.lastTradePriceOnly,
      		change: {
      			dollar: responseItem.change,
      			percent: responseItem.changeInPercent * 100
      		},
      		year: {
      			high: responseItem['52WeekHigh'],
      			low: responseItem['52WeekLow']
      		}
      	});
      }
    }
    return translatedResponse;
  };

  var getForSymbols = function(symbols, callback) {
  	// Sanitize params
  	Params.required('symbols', symbols, Array).required('callback', callback, Function);
  	// Call Yahoo Finance API
  	YahooFinance.snapshot({
    	symbols: symbols
    }, function(error, response) {
      if(!error) {
      	response = translateYahooFinanceResponse(response);
        callback(false, response);
      }
      else {
        callback(error);
      }
    });
  };

  // Public API
  return {
    getForSymbols: getForSymbols
  };

}();