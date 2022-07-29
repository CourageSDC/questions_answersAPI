require('dotenv').config();
const express = require('express')
const db = require('../db');
const questionRouter = require('./routes.js');


const app = express()
app.use(express.json());
app.use('/qa/questions', questionRouter);

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

const PORT = process.env.PORT || 4000;
app.listen(PORT);

