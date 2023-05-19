const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models/sessionModels');

// using google strategy to authenticate clients
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google/callback',
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const id = [profile.id];
      const queryStr =
        'SELECT _id, google_identity, email, firstname FROM users WHERE google_identity = $1';
      const currUser = await db.query(queryStr, id);
      if (currUser.rows.length) {
        done(null, currUser.rows[0]);
      } else {
        const newValues = [
          profile.id,
          profile.email,
          profile.given_name,
          profile.family_name,
          profile.picture
        ];
        const altQueryString =
          'INSERT INTO users (google_identity, email, firstname, lastname, picture) VALUES($1, $2, $3, $4, $5) RETURNING _id, google_identity, email, firstname, lastname, picture';
        const newUser = await db.query(altQueryString, newValues);
        done(null, newUser.rows[0]);
      }
    }
  )
);
// takes piece of info from record and pass on to put in cookie
passport.serializeUser((user, done) => {
  console.log('serialize user');
  // id will be associated with the user created in the database
  done(null, user._id);
});

// when cookie comes back, recieve id and deserialize so we can grab user from id
passport.deserializeUser(async (id, done) => {
  console.log('deserialize user');
  const values = [id];
  const queryStr = 'SELECT _id, email, firstname, lastname, picture FROM users WHERE _id = $1';
  const currUser = await db.query(queryStr, values);
  // this will attach the user property to the req object so we can access inside a route handler
  done(null, currUser.rows[0]);
});
