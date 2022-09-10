const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

function initializePassport(passport) {
  const authenticateUser = async (username, done) => {
    const user = await User.find({ username: req.body.username });

    if (user == null) {
      return done(null, false, { message: "No user with that username" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initializePassport;
