const express = require("express");
const router = express.Router();

/* GET home page. */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

router.get("/", isLoggedIn, function (req, res, next) {
  res.render("index", { name: "Russell", title: "Authentication" });
});

module.exports = router;
