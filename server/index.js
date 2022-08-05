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

app.get('/loaderio-1d34c548d72c17e29e6072f33d86071a', (req, res) => {
  res.send('loaderio-1d34c548d72c17e29e6072f33d86071a');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`You are listending on port ${PORT}`)
});

