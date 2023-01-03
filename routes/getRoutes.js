const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");
const {
  getNotices,
  getEvents,
  getMembers,
} = require("../controller/getController");
const auth = require("../middleware/auth");

router.get("/notices", auth, getNotices);
router.get("/events", auth, getEvents);
router.get("/members", auth, getMembers);

module.exports = router;
