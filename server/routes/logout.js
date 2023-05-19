const express = require('express');
// require middleware controllers
const router = express.Router();

// logout user
router.get('/', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.status(200).send('logged out');
  });
});
module.exports = router;
