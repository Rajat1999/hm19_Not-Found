require('dotenv').config({ path: './bin/.env' });
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

require('./DB/connect');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/registration');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'mySecretCookieSalt',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 3600000, // 1hr
    // secure: true, // in production (can use config directory)
    // domain: config.host,
    path: '/',
  },
}));

// connect-flash added for flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.email = req.flash('email');
  res.locals.success_msg = req.flash('success_msg');
  res.locals.introAgain = req.flash('introAgain');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.jwt = req.flash('jwt');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
