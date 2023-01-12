//user schema
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  name: String,
  description: String,
  input: String,
  output: String,
  active: {
    type: Boolean,
    default: true,
  },
});

const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
