'use strict';

// Import dependencies
var Mongoose = require('mongoose');

/**
 * Domain model representing a Question
 */

// Create Mongoose schema
var QuestionSchema = new Mongoose.Schema({
  question: {
    type: String
  },
  answer: {
    type: String
  },
  tags: {
    type: [String]
  }
});

// Create model from schema
var Question = Mongoose.model('Question', QuestionSchema);

// Export model
module.exports = Question;