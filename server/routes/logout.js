const express = require('express');
const router = express.Router();

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
