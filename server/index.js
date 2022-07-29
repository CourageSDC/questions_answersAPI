require('dotenv').config();
const express = require('express')
const db = require('../db');
const questionsRouter = require('./routes.js');


const app = express()
app.use(express.json());
app.use('/qa/questions', questionsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`You are listending on port ${PORT}`)
});

