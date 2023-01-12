//user schema
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  branch: String,
  year: String,
  mobile: String,
  birthday: String,
  password: String,
  score: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        unique: true,
      },
    },
  ],
  leetcode_id: String,
  allowed: {
    type: Boolean,
    default: false,
  },
  leetcode_solved: [
    {
      easy: Number,
      medium: Number,
      hard: Number,
      all: Number,
    },
  ],
  role: {
    type: String,
    default: "user",
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
