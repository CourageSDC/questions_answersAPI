const { Pool } = require('pg')

const pool = new Pool({
  user: 'pmcbride',
  database: '',
  host: 'localhost',
  password: '',
  port:
})

module.exports = {
  getQuestions: (id, limit, offset) => {
    let queryString = `SELECT * FROM questions LIMIT ${limit}`;
    return pool.query(queryString)
      .then(res => {console.log('query all questions', res)})
      .catch(err => console.log('error getting all questions', err))
      // const duration = Date.now() - start
  },

  // One above would be like getQuestions
}

