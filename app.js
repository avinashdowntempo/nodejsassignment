const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cluster = require('cluster');
const debug = require('debug')('nodejs-assignment:app');
const mongoose = require('mongoose');
const dbURL = require('./config/db');
const passport = require("passport");

//connecting to database
const db = mongoose.connect(dbURL, {
  useNewUrlParser: true
}).then(() => debug(`connected to MongoDB  :worker id ${cluster.worker.id}`)).catch((err) => debug(`Failed to connect to MongoDB  :worker id ${cluster.worker.id}`));
mongoose.Promise = global.Promise;

const User = require('./models/userModel');
const base = "/api/v1"
require('./auth/auth');

const type1Router = require('./routes/type1Router');
const type2Router = require('./routes/type2Router');
const type3Router = require('./routes/type3Router');
const signupRouter = require('./routes/signupRouter')(User);
const loginRouter = require('./routes/loginRouter')(User);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//authenticating routes with JWT for type1,type2,type3
app.use(base + '/type1', passport.authenticate('jwt', {
  session: false
}), type1Router);
app.use(base + '/type2', passport.authenticate('jwt', {
  session: false
}), type2Router);
app.use(base + '/type3', passport.authenticate('jwt', {
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