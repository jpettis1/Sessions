const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models/sessionModels');

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

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log('deserialize user');
  const values = [id];
  const queryStr = 'SELECT _id, email, firstname, lastname, picture FROM users WHERE _id = $1';
  const currUser = await db.query(queryStr, values);
  done(null, currUser.rows[0]);
});
