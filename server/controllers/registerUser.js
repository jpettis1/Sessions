const db = require('../models/sessionModels');
const { genPassword } = require('../../lib/passwordUtils');
// declare const set to object literal - hold methods on the workoutController object
const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const saltHash = genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    // const values = [username, hash, salt];
    const queryStr =
      'INSERT INTO users (email, hash, salt) VALUES($1, $2, $3) RETURNING _id, email';
    const newUser = await db.query(queryStr, values);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = registerUser;
