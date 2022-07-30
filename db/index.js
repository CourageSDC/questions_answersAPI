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
  getQuestions: async (productId, page, count) => {
    // let queryQuestions =
    // `SELECT * FROM questions WHERE product_id = ${productId} AND reported IS FALSE`;

    // `SELECT *
    // FROM questions
    // WHERE product_id = ${productId}
    // ORDER BY DESC
    // LIMIT ${count || page}`;

    //  `SELECT *
    //  FROM questions
    //  INNER JOIN answers ON (questions.question_id = answers.question_id)
    //  INNER JOIN answers_photos ON (answers.answer_id = answers_photos.answer_id)
    //  WHERE product_id = ${productId} AND questions.reported is false`;

    //  `SELECT q.*, a.*, ap.*
    //   FROM questions q, answers a, answers_photos ap
    //   WHERE q.product_id = ${productId}
    //   AND q.question_id = a.question_id
    //   AND a.answer_id = ap.answer_id
    //   AND q.reported is false
    //   AND a.reported is false`;

    // const queryQuestions =
    //   `SELECT q.*, a.*, ap.*
    // FROM questions q
    // INNER JOIN answers a ON (q.question_id = a.question_id)
    // INNER JOIN answers_photos ap ON (a.answer_id = ap.answer_id)
    // WHERE q.product_id = ${productId}
    // AND q.question_id = a.question_id
    // AND a.answer_id = ap.answer_id
    // AND q.reported is false
    // AND a.reported is false`;

    // const queryAnswers = `SELECT * FROM answers WHERE (SELECT product_id FROM questions WHERE product_id = ${productId})`;
    // const queryAnswerPhotos = `SELECT * FROM answers_photos WHERE (SELECT product_id, question_id FROM questions WHERE product_id = ${productId}) AND (SELECT answer_id FROM answers WHERE question_id = questions.question_id) WHERE answers_photos.answer_id = answers.answer_id`;

    // const allQueries = [queryQuestions, queryAnswers, queryAnswerPhotos];
    // const qnaData = await Promise.all(
    //   allQueries.map((query) => {
    //     pool.query(productId);
    //   })
    // )
    // qnaData()
    //   .then(res => { console.log('get all questions', res.rows) })
    //   .catch(err => console.log('error getting all questions', err))


    let queryString = `SELECT json_build_object(
      'product_id', questions.product_id,
      'results', json_agg(
        json_build_array(
          'question_id', questions.question_id,
          'question_body', questions.question_body,
          'question_date', questions.date_written,
          'asker_name', questions.asker_name,
          'question_helpfulness', questions.helpful,
          'reported', questions.reported,
          'answers', json_agg(
            json_build_object(
              'answers.answer_id', json_agg(
                json_build_object(
                  'id', answers.answer_id,
                  'body', answers.body,
                  'date', answers.date_written,
                  'answerer_name', answers.answerer_name,
                  'helpfulness', answers.helpful,
                  'photos', json_agg(
                    json_build_array(
                      answers_photos.url
                    )
                  )
                )
              )
            )
          )
        )
      )
    ) AS questions
    FROM questions, answers, answers_photos
    WHERE questions.product_id = ${productId}
    AND questions.questions_id = answers.question_id
    AND answers.answer_id = answers_photo.answer_id
    GROUP by product_id`;
    return pool.query(queryString)
      .then(res => { console.log('get all questions', res.rows) })
      .catch(err => console.log('error getting all questions', err))
    // const duration = Date.now() - start
  },

  // I have tried JOIN, INNER JOIN


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
