const express = require('express');
const router = express.Router();

const controller = require('./controllers.js');

router.use((req, res, next) => {
  // console.log('Time: ', Date.new())
  next()
})

//Get all Questions
router.get('', controller.getQuestions)

//Get all Answers
router.get('/:question_id/answers', controller.getAnswers)

// Post a Question
router
  .route('/')
  .post(controller.postQuestion)
  // return 201 Created

// Post an Answer
router
  .route('/:question_id/answers')
  .post(controller.postAnswer)
  // return 201 Created

//Mark Question as Helpful
router
  .route('/:question_id/helpful')
  .put(controller.incrementQuestionHelp)
  // return 204 No Content

//Report Question
router
  .route('/:question_id/report')
  .put(controller.reportQuestion)
  //return 204 No Content

//Mark Answer as Helpful
router
  .route('/:question_id/helpful')
  .put(controller.incrementAnswerHelp)
  // return 204 No Content

//Report Answer
router
  .route('/:question_id/report')
  .put(controller.reportAnswer)
  // return 204 No Content

module.exports = router

