const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");
const {
  getNotices,
  getEvents,
  getMembers,
  getQuestions,
  getQuestionById,
  getScore,
} = require("../controller/getController");
const auth = require("../middleware/auth");

router.get("/notices", auth, getNotices);
router.get("/events", auth, getEvents);
router.get("/members", auth, getMembers);
router.get("/questions", getQuestions);
router.get("/question/:id", getQuestionById);
router.get("/score/:id", getScore);

module.exports = router;
