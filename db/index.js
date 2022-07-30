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
    let queryQuestions =
    `SELECT * FROM questions WHERE product_id = ${productId} AND reported IS FALSE`;
    // `SELECT *
    // FROM questions
    // WHERE product_id = ${productId}
    // ORDER BY DESC
    // LIMIT ${count || page}`;
    return pool.query(queryQuestions)
      .then(res => { console.log('get all questions', res.rows) })
      .catch(err => console.log('error getting all questions', err))
    // const duration = Date.now() - start
  },

  // const questionQueries = [several queries];
  // const qnaData = await Promise.all(
  //   questionQueries.map(
  //     (query) => pool.query(productId)
  //     )
  // )

  // let queryAnswers = `SELECT * FROM answers WHERE `
  // let queryAnswerPhotos


  getAnswers: (questionId, page, count) => {
    console.log('working on it')

  },

  postQuestion: () => {

  },
  // INSERT INTO for new Questions or Answers

  postAnswer: () => {

  },

  incrementQuestionHelp: () => {

  },
//   UPDATE questions
// SET

  reportQuestion: () => {

  },

  incrementAnswerHelp: () => {

  },

  reportAnswer: () => {

  }
}
