var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var routes = require('./routes/index');
var prasang = require('./routes/prasang');

var users=[
  {id:1, username:'sevak', password:'iamgunatit'},
  {id:2, username:'admin', password:'iamurs4ever'}
];

function findByUsername(username, fn){
  for(var i= 0, len=users.length; i< len; i++){

    var user = users[i];
    if(user.username == username){
      return fn(null,user);
    }
  }
  return fn(null,null);
}

passport.use(new BasicStrategy({},
                function(username,password,done){
                  process.nextTick(function () {
                    findByUsername(username, function(err,user){
                      if(err){return done(err);}
                      if(!user){return done(null,false);}
                      if(user.password != password){return done(null,false);}
                      return done(null,user);
                    })
                  });
                }))

var app = express();

app.mountpath
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.static(__dirname + '/pulbic'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//app.use('/',routes);
//app.use('/', prasang);



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
