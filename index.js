require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 5000;
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var logger = require('morgan');
const mongoose = require("mongoose");
const fs = require("fs");
// const http = require('http');
const https = require("https");
// const flash = require('express-flash');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var lecturesRouter = require("./routes/lectures");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var adminRouter = require("./routes/admin");
var lectureRouter = require("./routes/lecture");
var errorRouter = require("./routes/error");

mongoose
  .connect(
    process.env.NODE_ENV == "production"
      ? process.env.DB_PROD_URL
      : process.env.DB_DEV_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB connection failed"));

const log4js = require("log4js");
const { Http2ServerRequest } = require("http2");
const { request } = require("http");

log4js.configure({
  appenders: { everything: { type: "file", filename: "logs.log" } },
  categories: { default: { appenders: ["everything"], level: "ALL" } },
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/lectures", lecturesRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/lecture", lectureRouter);
app.use("/error", errorRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
