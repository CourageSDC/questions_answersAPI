const db = require ('../db/index.js');
const axios = require ('axios');

module.exports = {

  getQuestions: (req, res) => {
    let productId = req.query.product_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    db.getQuestions(productId, page, count)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400))
  },

  getAnswers: (req, res) => {
    let questionId = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    db.getAnswers(questionId, page, count)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400))
  },

  postQuestion: (req, res) => {
    let productId = req.query.product_id;
    let formInput = req.query.body;
    db.postQuestion (productId, formInput)
      // .then(data => res.)
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