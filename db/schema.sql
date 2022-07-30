
-- CREATE DATABASE questions_and_answers;
-- CREATE SCHEMA questions_and_answers;
DROP DATABASE IF EXISTS questions;

CREATE DATABASE "questions";
\c questions;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS answers_photos;

-- ---
-- Table 'questions'
-- ---

CREATE TABLE questions (
  question_id SERIAL UNIQUE PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported VARCHAR(10) DEFAULT 'false',
  helpful INTEGER DEFAULT 0
);

COPY questions
FROM '/Users/pmcbride/Documents/HackReactor_rfp2205/SDC/questions.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'answers'
-- ---

CREATE TABLE answers (
  answer_id SERIAL UNIQUE PRIMARY KEY,
  question_id INTEGER REFERENCES questions (question_id),
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported INTEGER DEFAULT 0,
  helpful INTEGER DEFAULT 0
);

COPY answers
FROM '/Users/pmcbride/Documents/HackReactor_rfp2205/SDC/answers.csv'
DELIMITER ','
CSV HEADER;
-- ---
-- Table 'photos'
-- ---

CREATE TABLE answers_photos (
  photo_id SERIAL UNIQUE PRIMARY KEY,
  answer_id INTEGER REFERENCES answers (answer_id),
  url VARCHAR
);

COPY answers_photos
FROM '/Users/pmcbride/Documents/HackReactor_rfp2205/SDC/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Questions` (`product_id`,`question_id (foreign key)`) VALUES
-- ('','');
-- INSERT INTO `QuestionData` (`question_id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`,`question_email`,`answer_id(foreign key)`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `AnswerData` (`answer_id`,`body`,`date`,`answerer_name`,`helpfulness`,`answer_email`,`photo_id(foreign key)`,`photos`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Photos` (`photo_id`,`url`) VALUES
-- ('','');