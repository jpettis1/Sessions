const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const db = require("../models/sessionModels");

// using google strategy to authenticate clients
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const id = [profile.id];
      const queryStr =
        "SELECT _id, google_identity, email, firstname FROM users WHERE google_identity = $1";
      const currUser = await db.query(queryStr, id);
      if (currUser.rows.length) {
        done(null, currUser.rows[0]);
      } else {
        const newValues = [profile.id, profile.email, profile.given_name];
        const altQueryString =
          "INSERT INTO users (google_identity, email, firstname) VALUES($1, $2, $3) RETURNING _id, google_identity, email, firstname";
        const newUser = await db.query(altQueryString, newValues);
        done(null, newUser.rows[0]);
      }
    }
  )
);

// takes piece of info from record and pass on to put in cookie
passport.serializeUser((user, done) => {
  // id will be associated with the user created in the database
  done(null, user._id);
});

// when cookie comes back, recieve id and deserialize so we can grab user from id
passport.deserializeUser(async (id, done) => {
  const values = [id];
  const queryStr = "SELECT _id, email, firstname FROM users WHERE _id = $1";
  const currUser = await db.query(queryStr, values);
  // this will attach the user property to the req object so we can access inside a route handler
  done(null, currUser.rows[0]);
});
