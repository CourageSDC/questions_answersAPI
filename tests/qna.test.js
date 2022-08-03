const { Pool } = require('pg');
const axios = require ('axios');
require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAME || "",
  database: "questions_answers",
  host: "localhost",
  password: process.env.PASSWORD,
  port: 5432,
});

describe('questions and answers API testing', () => {
  beforeAll(() => {
    pool.connect();
  });

  // afterAll( () => {
  //   pool.end();
  // });

  test('getQuestions returns status code 200 and default length of 5', () => {
    const params = {
      product_id: 23902,
      page: 1,
      count: 5
    };
    const options = {url: 'qa/questions', baseURL: 'http://127.0.0.1:4000', method: 'get', params: params};
    // const response = await axios.get('qa/questions').query(params);
    return axios(options)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.data.results.length).toBe(4);
      })
  });

  test('getQuestions should return the correct structure and type', () => {
    const params = {
      product_id: '23902',
    };
    const options = {url: 'qa/questions', baseURL: 'http://127.0.0.1:4000', method: 'get', params: params};
    return axios(options)
      .then(response => {
        expect(response.data.product_id).toBeDefined();
        expect(response.data.results).toBeDefined();
        expect(response.data.results.question_id).toBeDefined();
        expect(response.data.results.answers).toBeInstanceOf(Object);
      })
  });

  test('getQuestions should error if product not found', () => {
    const params = {
      product_id: '2394785092398238923',
    };
    const options = {url: 'qa/questions', baseURL: 'http://127.0.0.1:4000', method: 'get', params: params};
    return axios(options)
    .then(response => {
      expect(response.status).toBe(400);
    })
  });

  // test('getAnswers return status code 200 & default length of 5', async () => {
  //   const params = {
  //     question_id: 83839,
  //     page: 1,
  //     count: 5
  //   };
  //   const response = await axios.get('qa/questions/:question_id/answers').query(params);
  //   expect(response.status).toBe(200);
  //   expect(response.body.results.length).toEqual(5);
  // });

  // test('getAnswers should return correct format', async () => {
  //   const params = {
  //     question_id: 83839,
  //     page: 1,
  //     count: 5,
  //   };
  //   const response = await axios.get('qa/questions/:question_id/answers').query(params);
  //   expect(response.status).toBe(200);
  //   expect(response.body.results[0].photos).toBeInstanceOf(Object);
  // });

  // it('postQuestion returns status code 201')

  // it('postAnswer returns status code 201')

})