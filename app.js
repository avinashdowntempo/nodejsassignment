const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('nodejs-assignment:app');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://192.168.51.10:27017/nodeassignment', {
  useNewUrlParser: true
}).then(() => debug(`connected to MongoDB`)).catch((err) => debug(`Failed to connect to MongoDB`));
mongoose.Promise = global.Promise;

const User = require('./models/userModel');

const passport = require("passport");
// const passportJWT = require("passport-jwt");

require('./auth/auth');

const type1Router = require('./routes/type1Router');
const type2Router = require('./routes/type2Router');
const type3Router = require('./routes/type3Router');
const signupRouter = require('./routes/signupRouter')(User);
const loginRouter = require('./routes/loginRouter')(User);


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/type1', passport.authenticate('jwt', {
  session: false
}), type1Router);
app.use('/type2', passport.authenticate('jwt', {
  session: false
}), type2Router);
app.use('/type3', passport.authenticate('jwt', {
  session: false
}), type3Router);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

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
  res.send("error");
});

module.exports = app;