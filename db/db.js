import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionsSchema = new Schema({
  question_id: String,
  product_id: Number,
  question_body: { type: String, min: 0, max: 1000 },
  question_date: Date,
  asker_name: { type: String, min: 0, max: 60 },
  question_helpfulness: Number,
  reported: { type: String, default: 'false' },
  question_email: { type: String, max: 60 },
  answers: [
    { type: Schema.Types.ObjectId, ref: 'Answers' },
  ],
});

const answersSchema = new Schema({
  answer_id: String,
  body: { type: String, max: 1000 },
  date: Date,
  answerer_name: { type: String, max: 60 },
  helpfulness: { type: Number, default: 0 },
  answer_email: { type: String, max: 60 },
  photos: [{ photo_id: String, url: String }],
});

const Questions = mongoose.model('Questions', questionsSchema);
const Answers = mongoose.model('Answers', answersSchema);
