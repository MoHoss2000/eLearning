require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
// const http = require('http');
const https = require('https');
// const flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lecturesRouter = require('./routes/lectures');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var adminRouter = require('./routes/admin');
var lectureRouter = require('./routes/lecture');
var errorRouter = require('./routes/error');

var app = express();


mongoose.connect("mongodb+srv://mido:1234@cluster0-vjex6.gcp.mongodb.net/elearning", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB connection failed"));

const log4js = require('log4js');
const { Http2ServerRequest } = require('http2');
const { request } = require('http');

log4js.configure({
  appenders: { everything: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['everything'], level: 'ALL' } }
});

const logger = log4js.getLogger();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/lectures', lecturesRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/lecture', lectureRouter);
app.use('/error', errorRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const privateKey = fs.readFileSync('/etc/letsencrypt/live/mostafafarid.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/mostafafarid.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/mostafafarid.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
httpsServer.listen(443 || process.env.PORT);




// app.listen(process.env.PORT || 80);