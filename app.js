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
const navbarTemplate = "<nav class=\"navbar navbar-expand-lg bg-secondary text-uppercase fixed-top\" id=\"mainNav\">\n" +
    "    <div class=\"container\">\n" +
    "      <a class=\"navbar-brand js-scroll-trigger\" href=\"#page-top\"><%= title %></a>\n" +
    "      <button class=\"navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-secondary text-white rounded\"\n" +
    "        type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\"\n" +
    "        aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n" +
    "        Menu\n" +
    "        <i class=\"fas fa-bars\"></i>\n" +
    "      </button>\n" +
    "      <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n" +
    "        <ul class=\"navbar-nav ml-auto\">\n" +
    "          <li class=\"nav-item mx-0 mx-lg-1\">\n" +
    "            <a class=\"nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger\" href=\"index\">Pocetna</a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item mx-0 mx-lg-1\">\n" +
    "            <a class=\"nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger\" href=\"about\">O Projektu</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </nav>";
function processNavbars() {
  return navbarTemplate.replace('<%= title %>', title);
}
var navbar = processNavbars();
var elements = {
  "title": title,
  "navbar": navbar
};

app.get('/', function(req, res, next) {
  res.render("index.ejs", elements);
});

app.get('/form', function(req, res, next) {
  res.render("form.ejs", elements);
});

app.get('/about', function(req, res, next) {
  res.render("about.ejs", elements);
});

app.get('/confirmation', function(req, res, next) {
  let elementsWithEmail = elements;
  elementsWithEmail.email = "none"; // Just appends the email attribute to the elements

  res.render("confirmation.ejs", elementsWithEmail);
});

app.post('/confirmation', function(req, res, next) {
  let email = req.body.email;
  req.session.email = email;

  let elementsWithEmail = elements;
  elementsWithEmail.email = email; // Just appends the email attribute to the elements

  res.render("confirmation.ejs", elementsWithEmail);
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
  res.locals.error = err;
  // render the error page

  res.status(err.status || 500);
  console.log(err.status);
  res.render('error', {title: title});
});

module.exports = app;
