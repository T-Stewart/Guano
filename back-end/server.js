const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const postsRouter = require('./Routes/Posts');
const userRouter = require('./Routes/User');
const homeRouter = require('./Routes/Home')
const createError = require('http-errors');

const app = express()

const PORT = process.env.PORT || 8080
app.set('port', PORT)

const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost/guanoposts'
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../front-end/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));


app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//route setup
app.use('/api', homeRouter)
app.use('/api/posts', postsRouter)
app.use('/api/user', userRouter)


// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

