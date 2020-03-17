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
app.set('env', 'development');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession( {
  secret: "HSKAJHD8Sh8sahd87ahs8HASashd8HAHSd8ahsd87hasHSShsa8dhasASHD123vgfh2gvfh21gHG"
}));

const title = 'opusteno.org';
const navbar = `<nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">${title}</a>
      <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-secondary text-white rounded"
        type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
        aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="index">Pocetna</a>
          </li>
          <li class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="about">O Projektu</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;

  const head = `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="qoobes">
    <meta name="description" content="A website to improve communication between students and schools">
    <meta property="og:title" content="Opusteno - talking solves problems">
    <meta name="theme-color" content="#6dc75a">
    <meta name="twitter:description" content="Leading student-school communication forward">
    <meta name="twitter:card" content="summary_medium_image">
    <meta name="twitter:image" content="/img/handshake.png">
    <meta name="twitter:author" content="qoobes#0904">
  
    <title> ${title} </title>
    <link rel="icon" href="img/handshake.png">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/addition.min.css">
    </head>`;

var elements = {
  title: title,
  navbar: navbar,
  head: head
};

app.get('/', function(req, res, next) {
  res.render("index.ejs", elements);
});

app.post('/form', function(req, res, next) {
  let email = req.body.email;
  req.session.email = email;
  let mailHost = email.substring(email.length - 18);
  if (mailHost.toLowerCase() === "@2gimnazija.edu.ba") {
    elements.email = email; // Just appends the email attribute to the elements
    res.render("form.ejs", elements);
    res.end();
  } else { next({message: "Pogresan email", status: "400"}); }});
  app.get('/form', function (req, res, next) {
    next({message: "Potreban je email", status: "400"});
  });
app.get('/about', function(req, res, next) {
  res.render("about.ejs", elements);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  // render the error page

  res.status(err.status || 500);
  res.render('error', elements);
});

module.exports = app;
