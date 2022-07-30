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
router.post('', controller.postQuestion)

// Post an Answer
router.post('/:question_id/answers', controller.postAnswer)

//Mark Question as Helpful
router.put('/:question_id/helpful', controller.incrementQuestionHelp)

//Report Question
router.put('/:question_id/report', controller.reportQuestion)

//Mark Answer as Helpful
router.put('/:question_id/helpful', controller.incrementAnswerHelp)

//Report Answer
router.put('/:question_id/report', controller.reportAnswer)

module.exports = router

