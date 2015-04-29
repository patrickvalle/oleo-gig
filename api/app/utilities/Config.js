'use strict';

/**
 * Object containing all of the app config settings.
 * Retrieve a property via syntax similar to:
 * 
 *   - Config.server.host
 *   - Config.database.port
 */
module.exports = function() {

  // Here are all the must-have environment variables
  var REQUIRED_ENVIRONMENT_VARIABLES = [
    'OG_WUNDERGROUND_KEY'
  ];

  // Checks for required environment variables and errors out if any are missing
  (function(environmentVariables) {
    var missingSomething = false;
    for(var i in environmentVariables) {
      var environmentVariable = environmentVariables[i];
      if(!process.env[environmentVariable]) {
        missingSomething = true;
        console.error('The "%s" environment variable *must* be defined!', environmentVariable);
      }
    }
    if(missingSomething) {
      process.exit(1);
    }
  }(REQUIRED_ENVIRONMENT_VARIABLES));

  // Public API
  return {
    'server': {
      'host': process.env.OG_SERVER_HOST || '0.0.0.0',
      'port': process.env.OG_SERVER_PORT || '3000'
    },
    'wunderground': {
      'key': process.env.OG_WUNDERGROUND_KEY
    },
    'log': {
      'level': process.env.OG_LOG_LEVEL || 'debug'
    },
    'dev': process.env.OG_DEV_MODE || true
  };

}();