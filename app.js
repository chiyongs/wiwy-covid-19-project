//
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const logger = require("./conf/winston");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const pageRouter = require("./routes/page");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// html 렌더링을 가능하게 해줌
app.engine("html", require("ejs").renderFile);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https://cdnjs.cloudflare.com"],
      "object-src": ["'none'"],
      "frame-src": ["'self'", "https://www.youtube.com"],
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/page", pageRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
