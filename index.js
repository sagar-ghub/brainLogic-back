// import express from "express";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoutes");
const webRoutes = require("./routes/webRoutes");
const getRoutes = require("./routes/getRoutes");
const cronJob = require("./node-cron");
var cron = require("node-cron");
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://sagarmongodb:9937170872@cluster0.hh7px.mongodb.net/videochat?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//routes routes
app.use("/auth", authRoutes);
app.use("/create", webRoutes);
app.use("/get", getRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});

// cronJob();
