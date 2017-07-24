var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var models = require('./models/index');
var utils = require('./utils');
var parseFile = require('./utils/tempFile');
var graphModule = require('./utils/graphModule');

var usersRoutes = require('./routes/users');
var busesRoutes = require('./routes/buses');
var stopsRoutes = require('./routes/stops');
var directionRoutes = require('./routes/directios');
var issueRoutes = require('./routes/issues');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('cors')());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoutes);
app.use('/buses', busesRoutes);
app.use('/stops', stopsRoutes);
app.use('/direction', directionRoutes);
// app.use('issues', issueRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = {};
  err.status = 404;
  next(err);
});

app.use(utils.errorHandler);

// first run this
// parseFile.clearTables().then(function () {
//   parseFile.parseExcel().then(function () {
//   });
// });

// then uncomment this
// parseFile.insertKsr();

// parseFile.countStops();

// parseFile.setDefaultStopsOrder();

// graphModule.initGraph();

// graphModule.test();

// graphModule.writeGraphFile();

// graphModule.testJar().then(function (result) {
//
// });

graphModule.fixMissingDriving();

// parseFile.fixMissingStops();

module.exports = app;
