const express = require('express');
const router = express.Router();

const controller = require('./controllers.js');

router.use((req, res, next) => {
  // console.log('Time: ', Date.new())
  next()
})

//Get all Questions
router.get('/questions', controller.getQuestions)

//Get all Answers
router.get('/questions/:question_id/answers', controller.getAnswers)

// Post a Question
router.post('/questions', controller.postQuestion)

// Post an Answer
router.post('/questions/:question_id/answers', controller.postAnswer)

//Mark Question as Helpful
router.put('/questions/:question_id/helpful', controller.incrementQuestionHelp)

//Report Question
router.put('/questions/:question_id/report', controller.reportQuestion)

//Mark Answer as Helpful
router.put('/answers/:answer_id/helpful', controller.incrementAnswerHelp)

//Report Answer
router.put('/answers/:answer_id/report', controller.reportAnswer)

module.exports = router

