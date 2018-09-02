const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: 841433569401117,
        clientSecret: "e7b3faf07bb86b1d07cfc4e84ab6dc1f",
        callbackURL: "http://localhost:8000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
};
