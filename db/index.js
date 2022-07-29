const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },

  // One above would be like getQuestions
}

