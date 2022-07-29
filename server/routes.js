const express = require('express');
const router = express.Router();

const controller = require('./controllers.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.new())
  next()
})

//Get all Questions
router
  .route('/:product_id')
  .get(controller.getQuestions)
  // return 200 Ok & Data

//Get all Answers
router
  .route('/:question_id/answers')
  .get(controller.getAnswers)
  // return 200 Ok & Data

// Post a Question
router
  .route('/:product_id')
  .post(controller.postQuestion)
  // return 201 Created

// Post an Answer
router
  .routed('/:question_id/answers')
  .post(controller.postAnswer)
  // return 201 Created

//Mark Question as Helpful
router
  .routed('/:question_id/helpful')
  .put(controller.incrementQuestionHelp)
  // return 204 No Content

//Report Question
router
  .routed('/:question_id/report')
  .put(controller.reportQuestion)
  //return 204 No Content

//Mark Answer as Helpful
router
  .routed('/:question_id/helpful')
  .put(controller.incrementAnswerHelp)
  // return 204 No Content

//Report Answer
router
  .routed('/:question_id/report')
  .put(controller.reportAnswer)
  // return 204 No Content

module.exports = router

