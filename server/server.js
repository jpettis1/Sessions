const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passportConfig/googleAuthStrategy');
require('./passportConfig/localAuthStrategy');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// handle session data, gives access to req.session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false }
  })
);

// refresh the passport middleware every time we load a route (e.g. maybe the session has expired)
app.use(passport.initialize());

// corresponds to the express session middleware, passport bootstraps off of this to authenticate users
// via serialize/deserialize user
app.use(passport.session());

/**
 * require routers
 */
const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

/**
 * handle parsing request body
 */
app.use(express.json());

/**
 * handle requests for static files - only in production mode
 */
// app.use(express.static(path.resolve(__dirname, "../client")));
/**
 * define route handlers
 */
app.use('/workouts', workoutsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// serve main application - only in production mode
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

app.use('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

/**
 * configure express global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('errorObj.log: ', errorObj.log);
  console.error(err.stack);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
