
-- CREATE DATABASE questions_and_answers;
-- CREATE SCHEMA questions_and_answers;
DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE "questions_answers";
\c questions_answers;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS answers_photos;

-- ---
-- Table 'questions'
-- ---

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  helpful INTEGER DEFAULT 0 NOT NULL
);

COPY questions
FROM '/Users/pmcbride/Documents/HackReactor_rfp2205/SDC/questions.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE questions RENAME COLUMN body TO question_body;
ALTER TABLE questions RENAME COLUMN id TO question_id;
ALTER TABLE questions ALTER COLUMN date_written SET DATA TYPE timestamptz USING timestamptz 'epoch' + date_written * interval '1 millisecond';

CREATE INDEX productId_questions ON questions(product_id);
CREATE INDEX noreport_questions ON questions(reported) WHERE reported = false;

-- ---
-- Table 'answers'
-- ---

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions (question_id),
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  helpful INTEGER DEFAULT 0 NOT NULL
);

COPY answers
FROM '/Users/pmcbride/Documents/HackReactor_rfp2205/SDC/answers.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE answers RENAME COLUMN id TO answer_id;
ALTER TABLE answers ALTER COLUMN date_written SET DATA TYPE timestamptz USING timestamptz 'epoch' + date_written * interval '1 millisecond';

CREATE INDEX questionId_answers ON answers(question_id);
CREATE INDEX noreport_answers ON answers(reported) WHERE reported = false;

-- ---
-- Table 'photos'
-- ---

CREATE TABLE answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers (answer_id),
  url VARCHAR(255)
);

COPY answers_photos
FROM '/Users/pmcbride/Documents/HackReactor_rfp2205/SDC/answers_photos.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE answers_photos RENAME COLUMN id TO photo_id;
CREATE INDEX photos ON answers_photos(answer_id);



-- CREATE INDEXES HERE --

-- CREATE INDEX productId_questions ON questions(product_id);

-- CREATE INDEX questionId_answers ON answers(question_id);

-- CREATE INDEX noreport_questions ON questions(reported) WHERE reported = false;

-- CREATE INDEX noreport_answers ON answers(reported) WHERE reported = false;

-- CREATE INDEX photos ON answers_photos(answer_id);


-- ---
-- Run these comands if error adding questions or answers : duplicate key value violates unique constraint "questions_pkey"
--

-- SELECT setval('questions_id_seq', (SELECT MAX(question_id) FROM questions)+1);
-- SELECT setval('answers_id_seq', (SELECT MAX(answer_id) FROM answers)+1);
-- SELECT setval('answers_photos_id_seq', (SELECT MAX(photo_id) FROM answers_photos)+1);
