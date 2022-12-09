const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;
// app.use("/assets", express.static(path.join(__dirname, "../client/assets")));

// app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
// app.use(express.static("client"));
/**
 * require routers
 */
const usersRouter = require("./routes/users");
const workoutsRouter = require("./routes/workouts");
/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */

/**
 * define route handlers
 */
// route handler to response to put requests to /workouts
app.use("/workouts", workoutsRouter);
// route handler to respond to get requests to users / login
app.use("/users", usersRouter);
// route handler to respond with main app

// catch-all route handler for any requests to an unknown route
app.use("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
/**
 * configure express global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("errorObj.log: ", errorObj.log);
  console.error(err.stack);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
// // export app
// module.exports = app;
