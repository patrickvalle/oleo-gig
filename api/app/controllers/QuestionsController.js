'use strict';

// Import dependencies
var _s = require('underscore.string');
var ErrorResponse = require('../utilities/ErrorResponse');
var QuestionsService = require('../services/QuestionsService');

/**
 * Controller responsible for handling RESTful interactions involving Questions
 */
module.exports = function(router) {

  /**
   * Returns a list of questions
   */
  router.get('/questions', function(request, response) {
    QuestionsService.list({}, function(questions) {
      response.send(questions);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to list questions.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Returns a single question with the specified id
   */
  router.get('/questions/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find question by id
    QuestionsService.findById(id, function(question) {
      response.send(question);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to find the question w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Saves a question
   */
  router.post('/questions', function(request, response) {
    // Pull request data
    var question = request.body;
    // Save question
    QuestionsService.save(question, function(savedQuestion) {
      response.send(savedQuestion);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to save that question.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Deletes a single question with the specified id
   */
  router.delete('/questions/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find question by id
    QuestionsService.deleteById(id, function(question) {
      response.send(question);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to delete the question w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

};
