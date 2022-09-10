const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.create(
      { username: req.body.username, password: hashedPassword },
      function (err, small) {
        if (err) return console.log(err);
      }
    );

    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

module.exports = router;
