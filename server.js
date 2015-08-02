// Declare models to use. If new is added you will need to use npm install -d "name"
// then use -> var nameOfIt = require('themodelName');

// Express delcared
var express = require('express');

// Path is used for path.join... it tels where specific paths are for what is used ...
var path = require('path');

// Not sure yet... please change me when understand
var favicon = require('serve-favicon');

// Logger for dev purpose
var logger = require('morgan');

// cookieParser is to change, reseve cooke... used to read it
var cookieParser = require('cookie-parser');

// bodyParser is used to read the body msg.. req.body.something('bla...');
var bodyParser = require('body-parser');

// Mongodb - mongoose is the database
var mongoose = require('mongoose');

// Passport is authentication middleware... for register, login and so forth..
var passport = require('passport');

// Linking to schemas, they are under models and is like "table in sql"... 
// How things are put in database -- used as followed require('./pathtomodels');
require('./server/models/Users');
require('./server/models/Posts');
require('./server/models/Comments');

// Config for passport.. look into the file to understand it better
require('./server/config/passport');

// Declaring the needed information of database in this config-file.. 
var dbConfig = require('./server/config/database');

// Database connection and url is the path to it!
mongoose.connect(dbConfig.url);

// making app as express server...
var app = express();

/*  Configuring App */

// view engine setup

// Make engine html use ejs render.
app.engine('html', require('ejs').renderFile);
// set path to views
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));

// Setting up use of middleware/models that are declared at top of this file.

// Logging in dev mode
app.use(logger('dev'));

// Middleware to read/write and other of json object
app.use(bodyParser.json());

// Middleware to read/write and other of urlencoded things
app.use(bodyParser.urlencoded({ extended: false }));

// Used to read/write and other of cookies
app.use(cookieParser());

// Telling express where static files are to use... 
// Meaning static = all files used.. js,css,hdml... this is like a libriary all things
// Can be found and only found there if you need to look.. is what it tells express
app.use(express.static(path.join(__dirname, 'public')));

// Intialize passport and telling app to use passport for authantications.. 
app.use(passport.initialize());


/*  Telling the app where to look for API files that are used  */

// Used as followed -- app.use(require('./pathtoroutefile'));
// Other information about option
// If app.use('/api', require('./pathToRoute')); is used... talking about '/api'
// The app will put /api infront of the "router.get('/posts', function (req, res, next)" function 
// router.get('/api/posts', function (req, res, next)
// There for no need to add /api infront of all others in routeFiles! will be automatic
// Leading you to call the servies with /api/posts from the frontEnd to get response.  

// Activated and telling app where the routes are  for "API" calls!
app.use(require('./server/routes/posts'));
app.use(require('./server/routes/users'));
app.use(require('./server/routes/index'));


// Developer stuff in error handling and gives stacktraces in console or renders error.html

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Exports the app.
module.exports = app;

// More logic about starting server, port and getting env configurations from cloud 
// If needed autmaticly hence the env configurations in nameOfApp/bin/www


