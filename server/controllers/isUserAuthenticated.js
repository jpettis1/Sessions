const auth = {};

auth.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

// future feature for admin users
auth.isAdmin = (req, res, next) => {};

module.exports = auth;
