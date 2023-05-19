const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models/sessionModels");
const { validPassword } = require("../../lib/passwordUtils");

const verifyCallback = async (username, password, done) => {
  try {
    const userInformation = [username];
    const queryStr =
      "SELECT _id, email, hash, salt FROM users WHERE email = $1";
    const currUser = await db.query(queryStr, userInformation);
    console.log("curr user", currUser.rows);
    if (!currUser.rows.length) {
      return done(null, false);
    }
    const isValid = validPassword(
      password,
      currUser.rows[0].hash,
      currUser.rows[0].salt
    );
    console.log("is valid", isValid);
    if (isValid) {
      console.log("valid user");
      return done(null, currUser.rows[0]);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
