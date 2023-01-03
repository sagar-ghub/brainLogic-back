const Events = require("../Model/Event");
const Notice = require("../Model/Notice");
const User = require("../Model/User");

const getNotices = async (req, res) => {
  await Notice.find({}, (err, notices) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!notices.length) {
      return res.status(404).json({ success: false, error: `Notes not found` });
    }

    return res.status(200).json({ success: true, data: notices });
  }).catch((err) => console.log(err));
};

const getEvents = async (req, res) => {
  await Events.find({}, (err, events) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!events.length) {
      return res.status(404).json({ success: false, error: `Notes not found` });
    }

    return res.status(200).json({ success: true, data: events });
  }).catch((err) => console.log(err));
};
const getMembers = async (req, res) => {
  await User.find({}, "name email branch year mobile", (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `Notes not found` });
    }

    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

module.exports = {
  getNotices,
  getEvents,
  getMembers,
};
