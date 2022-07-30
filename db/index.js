const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: process.env.USERNAME || '',
  database: process.env.DBNAME,
  host: '127.0.0.1',
  password: process.env.PASSWORD,
  port: 5432,
})

module.exports = {
  getQuestions: (productId, page, count) => {
    let queryString = `SELECT * FROM questions LIMIT ${limit}`;
    return pool.query(queryString)
      .then(res => {console.log('query all questions', res)})
      .catch(err => console.log('error getting all questions', err))
      // const duration = Date.now() - start
  },

  // One above would be like getQuestions
}

