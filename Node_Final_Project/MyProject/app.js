var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
var cors = require('cors')

var indexRouter = require('./routes/index');
var SubscriptionsRouter = require('./routes/Subscriptions');
var mainPageRouter = require('./routes/MainPageRouter');
var MovieRouter = require('./routes/MoviesRouter');
var UserRouter =require('./routes/UserRouter')



var app = express();
app.use(cors())


var session = require('express-session')
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/SubscriptionsDB');
/////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////////

mongoose.connect('mongodb://localhost:27017/UsersDb');
const authController = require('./JwtControllers/authController');
const userLoginController = require('./JwtControllers/userLoginController');

app.use('/api/auth', authController);
app.use('/api/userLogin', userLoginController);








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret:"mySecret"}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Subscriptions', SubscriptionsRouter);
app.use('/MenuePage', mainPageRouter);
app.use('/TestMoviePage',MovieRouter);
app.use('/UserPage', UserRouter);












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
