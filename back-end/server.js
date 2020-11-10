const express = require('express')
const path = require('path')
const logger = require('morgan')
const postsRouter = require('./Routes/Posts')
const createError = require('http-errors');

const app = express()

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


//route setup
app.use('/api/', postsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;