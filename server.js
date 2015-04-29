'use strict';

/**
 * Main "driver" class responsible for bootstrapping the app
 */

// Constants
var API_CONTEXT_ROOT = '/api';
var API_CONTROLLERS_PATH = './api/app/controllers';
var PUBLIC_STATIC_FILES_PATH = './public/app';

// Import dependencies
var BodyParser = require('body-parser');
var Express = require('express');
var RequireDirectory = require('require-directory');
var Config = require('./api/app/utilities/Config');
var ErrorResponse = require('./api/app/utilities/ErrorResponse');
var Log = require('./api/app/utilities/Log');

// Create Express router (for Controllers to mount their request handlers to)
var router = Express.Router();

// Configure JSON body parsing on the router
router.use(BodyParser.json());

// Bootstrap controllers and attach their corresponding routes to the router
(function(router, path) {
  RequireDirectory(module, path, { visit: function(controller) {
    controller(router);
  }});
}(router, API_CONTROLLERS_PATH));

// Create Express server and mount the router
var server = Express();
server.use(API_CONTEXT_ROOT, router);

// Configure static file support
server.use(Express.static(PUBLIC_STATIC_FILES_PATH));

// Configure Express' global error handling
server.use(function(error, request, response, next) {
  ErrorResponse.send(response, 500, 'Shit broke, needs fixed', error.stack);
});

// Start Express server
(function(server, config) {
  var instance = server.listen(config.port, config.host, function() {
    var host = instance.address().address;
    var port = instance.address().port;
    Log.info('Express server started @ http://%s:%s.', host, port);
  });
}(server, Config.server));
