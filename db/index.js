const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: 'pmcbride',
  database: "questions_answers",
  host: "localhost",
  password: '',
  port: 5432,
});

// const pool = new Pool({
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   host: process.env.PGHOST,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

module.exports = {
  getQuestions: (productId, limit, offset) => {
    let queryString =
      `SELECT ${productId} AS product_id,
      ${offset} AS page,
      ${limit} AS count,
      coalesce(json_agg(
        json_build_object(
          'question_id', questions.question_id,
          'question_body', questions.question_body,
          'question_date', questions.date_written,
          'asker_name', questions.asker_name,
          'question_helpfulness', questions.helpful,
          'reported', questions.reported,
          'answers', (SELECT coalesce((
              json_object_agg
              (
                answers.answer_id, json_build_object
                (
                  'id', answers.answer_id,
                  'body', answers.body,
                  'date', answers.date_written,
                  'answerer_name', answers.answerer_name,
                  'helpfulness', answers.helpful,
                  'photos', (SELECT coalesce(json_agg(answers_photos.url), '[]')
                  FROM answers_photos WHERE answers_photos.answer_id = answers.answer_id
                  )
                )
              )
            ), '{}')
            FROM answers WHERE answers.question_id = questions.question_id
          )
        )
      ), '[]') AS results
      FROM questions
      WHERE questions.product_id = ${productId}
      AND questions.reported IS FALSE
      OFFSET ${offset}
      LIMIT ${limit}`;

    return pool
      .query(queryString)
      .then((res) => {
        console.log("get all questions");
        return res.rows[0];
      })
      .catch((err) => console.log("error getting all questions", err));
  },


  getAnswers: (questionId, limit, offset) => {
      let queryString =
      `SELECT ${questionId} AS questions,
      ${offset} AS page,
      ${limit} AS count,
      coalesce (json_agg(
          json_build_object(
            'answer_id', answers.answer_id,
            'body', answers.body,
            'date', answers.date_written,
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.helpful,
            'photos', (SELECT coalesce(json_agg(
                json_build_object(
                  'id', answers_photos.photo_id,
                  'url', answers_photos.url
              )), '[]')
              FROM answers_photos
              WHERE answers_photos.answer_id = answers.answer_id
            )
          )
        ), '[]' ) AS results
      FROM answers
      WHERE answers.question_id = ${questionId}
      AND answers.reported IS FALSE
      OFFSET ${offset}
      LIMIT ${limit}`;

      return pool
        .query(queryString)
        .then((res) => {
          console.log("get all answers");
          return res.rows[0];
        })
        .catch((err) => console.log("error getting all questions", err));
  },

  postQuestion: (formInput) => {
    const { body, name, email, product_id } = formInput;
    let postQuestionQuery = `INSERT INTO questions (
      product_id,
      question_body,
      date_written,
      asker_name,
      asker_email
    )
    VALUES (${product_id}, '${body}', CURRENT_TIMESTAMP, '${name}', '${email}')
    `;
    return pool
      .query(postQuestionQuery)
      .then((res) => {
        console.log("Question has been posted.");
        return res;
      })
      .catch((err) => console.log("error posting a question", err));
  },

  postAnswer: (questionId, formInput) => {
    const { body, name, email, photos } = formInput;
    let postAnswerQuery = `INSERT INTO answers (
      question_id,
      body,
      date_written,
      answerer_name,
      answerer_email
    )
    VALUES (${questionId}, '${body}', CURRENT_TIMESTAMP, '${name}', '${email}')`;

    const postAnswerPhotosQuery = (photo) =>
    `INSERT INTO answers_photos(
      answer_id,
      url)
      VALUES ('${photo}')`;

    return pool
      .query(postAnswerQuery)
      .then(() => {
        return Promise.all(
          photos.map((photo) => postAnswerPhotosQuery(photo))
        )
      })
      .then((res) => {
        console.log("answer posted");
        return res;
      })
      .catch((err) => console.log("error posting a answer", err));
  },

  incrementQuestionHelp: (questionId) => {
    let QHelpQuery = `UPDATE questions
      SET helpful = helpful + 1
      WHERE question_id = ${questionId}`;
    return pool
      .query(QHelpQuery)
      .then((res) => {
        console.log("Helpfulness updated");
        return res;
      })
      .catch((err) => console.log("error updating helpfulness count", err));
  },

  reportQuestion: (questionId) => {
    let QReportQuery = `UPDATE questions
      SET reported = true
      WHERE question_id = ${questionId}`;
    return pool
      .query(QReportQuery)
      .then((res) => {
        console.log("Question reported");
        return res;
      })
      .catch((err) => console.log("error reporting question", err));
  },

  incrementAnswerHelp: (answerId) => {
    let AHelpQuery = `UPDATE answers
      SET helpful = helpful + 1
      WHERE answer_id = ${answerId}`;
    return pool
      .query(AHelpQuery)
      .then((res) => {
        console.log("Helpfulness updated");
        return res;
      })
      .catch((err) => console.log("error updating helpfulness count", err));
  },

  reportAnswer: (answerId) => {
    let AReportQuery = `UPDATE answers
    SET reported = true
    WHERE answer_id = ${answerId}`;
    return pool
      .query(AReportQuery)
      .then((res) => {
        console.log("Answer Reported");
        return res;
      })
      .catch((err) => console.log("error reporting answer", err));
  },
};
