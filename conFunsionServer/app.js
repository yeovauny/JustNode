var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promotionRouter = require('./routes/promotionRouter');


const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = config.mongoUrl;


const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** comment the cookies parser because We want to use authentication by session */
//app.use(cookieParser('12345-67890-09876-54321'));



app.use(passport.initialize());

/** We moved all autentication urls before of autentication function for loging before 
 *  to get information on other resources
 *   */ 
app.use('/', indexRouter);
app.use('/users', usersRouter);


//-----


app.use(express.static(path.join(__dirname, 'public')));



app.use('/dishes', dishRouter);
app.use('/leader', leaderRouter);
app.use('/promotion', promotionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
