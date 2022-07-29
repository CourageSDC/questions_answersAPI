const db = require ('../db/index.js');
const axios = require ('axios');

module.exports = {

  getQuestions: (req, res) => {
    let productId = req.params.product_id;
    let {page, count} = req.query;
    let limit = count || 5;
    let offset = (page - 1) * limit || 1;
    db.getQuestions(productId, limit, offset)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400))
  },

  getAnswers: (req, res) => {
    let questionId = req.params.question_id;
    let {page, count} = req.query,
    let limit = count || 5;
    let offset = (page - 1) * count || 1;
    db.getAnswers(questionId, count, offset)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400))
  },

  postQuestion: (req, res) => {

  },

  postAnswer: (req, res) => {

  },

  incrementQuestionHelp: (req, res) => {

  },

  reportQuestion: (req, res) => {

  },

  incrementAnswerHelp: (req, res) => {

  },

  reportAnswer: (req, res) => {

  }
}