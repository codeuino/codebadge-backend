var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var orgsRouter = require('./routes/orgs/');
var usersRouter = require('./routes/users/');
const {errorHandler,ErrorHandler} = require('./_helper/error-handler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orgs', orgsRouter);
app.use('/users', usersRouter);

app.get('/error', (req, res) => {
  throw new ErrorHandler(500, 'Internal server error');
})

app.get('/',(req,res)=>{
  res.render('index',{title:"Codebadge Backend API"})
})

app.use((err, req, res, next) => {
  errorHandler(err, res);
});

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
