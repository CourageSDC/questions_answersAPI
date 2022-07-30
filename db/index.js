const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: process.env.USERNAME || '',
  database: 'questions',
  host: 'localhost',
  password: process.env.PASSWORD,
  port: 5432,
})

module.exports = {
  getQuestions: (productId, page, count) => {
    let queryString =
    // `SELECT *
    // FROM questions
    // WHERE product_id = ${productId}
    // ORDER BY DESC
    // LIMIT ${count || page}`;
    `SELECT * FROM questions WHERE product_id = ${productId} AND reported = false`;
    return pool.query(queryString)
      .then(res => { console.log('get all questions', res) })
      .catch(err => console.log('error getting all questions', err))
    // const duration = Date.now() - start
  },

  getAnswers: (questionId, page, count) => {
    console.log('working on it')

  },
}