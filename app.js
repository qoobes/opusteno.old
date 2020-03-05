var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession( {
  secret: "HSKAJHD8Sh8sahd87ahs8HASashd8HAHSd8ahsd87hasHSShsa8dhasASHD123vgfh2gvfh21gHG"
}));

app.get('/', function(req, res, next) {
  res.render("index.ejs");
});

app.get('/form', function(req, res, next) {
  res.render("form.ejs");
});

app.get('/about', function(req, res, next) {
  res.render("about.ejs");
});

app.get('/confirmation', function(req, res, next) {
  res.render("confirmation.ejs", {email: "none"});
});

app.post('/confirmation', function(req, res, next) {
  let email = req.body.email;
  req.session.email = email;
  res.render("confirmation.ejs", {email: email});
  res.end();
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
