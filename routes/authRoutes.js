const express = require("express");

const router = express.Router();
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
router.post("/login", (req, res) => {
  console.log("as");
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        // res.send({ message: "login sucess", user: user });
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
            name: user.name,
            branch: user.branch,
            year: user.year,
            mobile: user.mobile,
            birthday: user.birthday,
            role: user.role,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        let userDetails = {
          ...user?._doc,
          token,
        };

        res.status(200).json({ message: "login sucess", user: userDetails });
      } else {
        // res.send({ message: "wrong credentials" });
        res.status(400).json({ error: "wrong credentials" });
      }
    } else if (err) {
      // res.send("not register");
      res.status(400).json({ error: err });
    } else {
      // res.send("not register");
      res.status(400).json({ error: "not register" });
    }
  });
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, branch, year, mobile, birthday } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(200).json({ message: "user already exist" });
    } else {
      const user = new User({
        name,
        email,
        password,
        branch,
        year,
        mobile,
        birthday,
      });
      user.save((err) => {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.status(200).json({ message: "user created" });
        }
      });
    }
  });
});

module.exports = router;
