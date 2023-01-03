//user schema
const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  faculty: [
    {
      type: String,
    },
  ],
});

const Events = new mongoose.model("Event", eventSchema);

module.exports = Events;
