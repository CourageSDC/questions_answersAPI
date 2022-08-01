require('dotenv').config();
const express = require('express')
const db = require('../db');
const questionsRouter = require('./routes.js');


const app = express()
app.use(express.json());
// app.get('/test', (req, res) => {
//   res.send('does this work');
// })
app.use('/qa', questionsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`You are listending on port ${PORT}`)
});

