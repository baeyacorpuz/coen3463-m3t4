var passportLocalMongoose = require('passport-local-mongoose');
    passport = require('passport')
    LocalStrategy = require('passport-local').Strategy;
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
    passport = require('passport')


var db = require('./model/db');
    blob = require('./model/blobs');
    user = require('./model/user');

var routes = require('./routes/index'),
    blobs = require('./routes/blobs');
    login = require('./routes/login');
    newuser = require('./routes/newuser');
    edituser = require('./routes/edituser');
    indexuser = require('./routes/indexuser');

var passport = passport();

passport.use(new LocalStrategy(User.authenticate()));
//passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//passport config
//passport.use(new LocalStrategy(User.authenticate()));

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());


app.use('/', routes);
app.use('/blobs', blobs);
app.use('/login', login);
app.use('/newuser', newuser);
app.use('/edituser', edituser);
app.use('/indexuser', indexuser);

//app.use('/users', users);

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
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
