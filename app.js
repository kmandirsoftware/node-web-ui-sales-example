var express = require('express');
var path = require('path');
var logger = require('morgan');
const fs = require('fs');
const mysql = require("mysql");
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// routes
const routes = require('./routes/routes.js')(app, mysql, fs, checkAuthenticated, checkNotAuthenticated);
const loginroutes = require('./routes/loginauth.js')(app,mysql,bcrypt,passport,flash,session,methodOverride, checkNotAuthenticated);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

const server = app.listen(3000, () => {
    console.log('listening on port %s...', server.address().port);
});
