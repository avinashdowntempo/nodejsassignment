var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const debug = require('debug')('nodejs-assignment:app');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/nodeassignment', {
  useNewUrlParser: true
}).then(() => debug(`connected to MongoDB`)).catch((err) => debug(`Failed to connect to MongoDB`));
const Login = require('./models/loginModel');
const Signup = require('./models/signupModel');

var type1Router = require('./routes/type1Router');
var type2Router = require('./routes/type2Router');
var type3Router = require('./routes/type3Router');
const signupRouter = require('./routes/signupRouter')(Signup);
const loginRouter = require('./routes/loginRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/type1', type1Router);
app.use('/type2', type2Router);
app.use('/type3', type3Router);
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
  res.render('error');
});

module.exports = app;