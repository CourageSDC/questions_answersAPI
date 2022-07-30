const db = require ('../db/index.js');
const axios = require ('axios');

module.exports = {

  getQuestions: (req, res) => {
    let productId = req.query.product_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    db.getQuestions(productId, page, count)
      .then(data => res.status(200).send(data))
      .catch(err => res.sendStatus(400))
  },

  getAnswers: (req, res) => {
    let questionId = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    db.getAnswers(questionId, page, count)
      .then(data => res.status(200).send(data))
      .catch(err => res.sendStatus(400))
  },

  postQuestion: (req, res) => {
    // let productId = req.query.product_id;
    let formInput = req.query.body;
    db.postQuestion (productId, formInput)
      .then(response => res.sendStatus(201))
      .catch(err => res.sendStatus(400))
  },

  postAnswer: (req, res) => {
    let questionId = req.params.question_id;
    let formInput = req.query.body;
    db.postAnswer (questionId, formInput)
      .then(response => res.sendStatus(201))
      .catch(err => res.sendStatus(400))
  },

  incrementQuestionHelp: (req, res) => {
    let questionId = req.params.question_id;
    db.incrementQuestionHelp (questionId)
      .then(response => res.sendStatus(204))
      .catch(err => res.sendStatus(400))
  },

  reportQuestion: (req, res) => {
    let questionId = req.params.question_id;
    db.reportQuestion (questionId)
      .then(response => res.sendStatus(204))
      .catch(err => res.sendStatus(400))
  },

  incrementAnswerHelp: (req, res) => {
    let answerId = req.params.answer_id;
    db.incrementAnswerHelp (answerId)
      .then(response => res.sendStatus(204))
      .catch(err => res.sendStatus(400))
  },

  reportAnswer: (req, res) => {
    let answerId = req.params.answer_id;
    db.reportAnswer (answerId)
      .then(response => res.sendStatus(204))
      .catch(err => res.sendStatus(400))
  }
}