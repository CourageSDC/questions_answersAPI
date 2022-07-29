const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.new())
  next()
})

//Get all Questions
router.get('/', (req,res) => {
  res.send('Here are the questions')
})

//Get all Answers
router.get('/', (req, res) => {
  res.send('Here are your answers')
})

// Get all Photos
router.get('/', (req, res) => {
  res.send('Here are your answer photos')
})

module.exports = router

