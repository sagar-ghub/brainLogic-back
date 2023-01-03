//user schema
const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
});

const Notice = new mongoose.model("Notice", noticeSchema);

module.exports = Notice;
