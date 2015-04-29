'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('paramatas');
var Question = require('../models/Question');

/**
 * Service responsible for handling interactions involving Questions
 */
module.exports = function() {

  /**
   * Returns a list of questions that match the supplied criteria
   * 
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(questions)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
    Params.required('criteria', criteria, Object).required('onSuccess', onSuccess, Function);
    var onFailure = onFailure || _.noop;
    // List questions
    Question.find(criteria, function(error, questions) {
      if(!error) {
        onSuccess(questions);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a question w/ the supplied id
   * 
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, String).required('onSuccess', onSuccess, Function);
    var onFailure = onFailure || _.noop;
    // Find question
    Question.findById(id, function(error, question) {
      if(!error) {
        onSuccess(question);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied question
   * 
   * @param {object} question
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(question, onSuccess, onFailure) {
    // Sanitize params
    Params.required('question', question, 'object');
    // Save question
    if(question._id) {
      update(question, onSuccess, onFailure);
    }
    else {
      create(question, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the question w/ the supplied id
   * 
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete question
    Question.findByIdAndRemove(id, function(error, question) {
      if(!error) {
        onSuccess(question);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Creates the supplied question
   * 
   * @param {object} question
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(question, onSuccess, onFailure) {
    // Sanitize params
    Params.required('question', question, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create question
    new Question(question).save(function(error, savedQuestion) {
      if(!error) {
        onSuccess(savedQuestion);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Updates the supplied question
   * 
   * @param {object} question
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(question, onSuccess, onFailure) {
    // Sanitize params
    Params.required('question', question, 'object');
    var onFailure = onFailure || _.noop;
    // Update question
    Question.findByIdAndUpdate(question._id, { 
      $set: question 
    }, function(error) {
      if(!error) {
        findById(question._id, onSuccess, onFailure);
      }
      else {
        onFailure(error);
      }
    });
  };

  // Public API
  return {
    list: list,
    findById: findById,
    save: save,
    deleteById: deleteById
  };

}();