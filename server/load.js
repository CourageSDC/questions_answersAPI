import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: '10000',
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 20,
      maxVUs: 10000
    },
  },
};

export default function () {
  let product_id = Math.floor(Math.random() * 100000 + 900000) + 1;
  let question_id = Math.floor(Math.random() * 100000) + 1;
  // const url = `http://localhost:4000/qa/questions`;
  // const params = {
  //   headers: {
  //     'Content-Type' : 'application/json',
  //   },
  // };

  group('GET questions', () => {
    const questionsTest = http.get(`http://localhost:4000/qa/questions?product_id=${product_id}`);
    check(questionsTest, { 'is status 200': (r) => r.status === 200 });
    sleep(1);
  });

  group('GET answers', () => {
    const answersTest = http.get(`http://localhost:4000/qa/questions/${question_id}/answers?count=500`);
    check(answersTest, { 'is status 200': (r) => r.status === 200 });
    sleep(1);
  });

  // http.get(url, params);
  // sleep(1);
}