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

  postQuestion: (formInput) => {
    const { body, name, email, product_id } = formInput;
    let postQuestionQuery =
      `INSERT INTO questions (
      product_id,
      question_body,
      date_written,
      asker_name,
      asker_email
    )
    VALUES (${product_id}, ${body}, ${+new Date()}, ${name}, ${email})`;
    return pool.query(postQuestionQuery)
      .then(res => { console.log('question posted') })
      .catch(err => console.log('error posting a question', err))
  },

  postAnswer: (questionId, formInput) => {
    const { body, name, email, photos } = formInput;
    let postAnswerQuery =
      `INSERT INTO answers (
      question_id,
      body,
      date_written,
      answerer_name,
      answerer_email,
      (INSERT INTO answers_photos (
        url
      )
      VALUES (${photos}))
    )
    VALUES (${questionId}, ${body}, ${+new Date()}, ${answerer_name}, ${answerer_email})`;
    return pool.query(postAnswerQuery)
      .then(res => { console.log('answer posted') })
      .catch(err => console.log('error posting a answer', err))
  },

  incrementQuestionHelp: (questionId) => {
    let QHelpQuery =
      `UPDATE questions
      SET helpful = helpful + 1
      WHERE question_id = ${questionId}`;
    return pool.query(QHelpQuery)
      .then(res => { console.log('Helpfulness updated') })
      .catch(err => console.log('error updating helpfulness count', err))
  },

  reportQuestion: (questionId) => {
    let QReportQuery =
      `UPDATE questions
      SET reported = true
      WHERE question_id = ${questionId}`;
    return pool.query(QReportQuery)
      .then(res => { console.log('Question reported') })
      .catch(err => console.log('error reporting question', err))
  },

  incrementAnswerHelp: (answerId) => {
    let AHelpQuery =
      `UPDATE answers
      SET helpful = helpful + 1
      WHERE answer_id = ${answerId}`;
    return pool.query(AHelpQuery)
      .then(res => { console.log('Helpfulness updated') })
      .catch(err => console.log('error updating helpfulness count', err))
  },

  reportAnswer: (answerId) => {
    let AReportQuery =
    `UPDATE answers
    SET reported = true
    WHERE answer_id = ${answerId}`;
  return pool.query(AReportQuery)
    .then(res => { console.log('Answer Reported') })
    .catch(err => console.log('error reporting answer', err))

  }
}
