'use strict';

const config = require('./server.config.js')

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TelegramBot = require('node-telegram-bot-api');
const redis = require('redis');

const routes = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const projects = require('./routes/projects');

var url = `mongodb://localhost:${config.dbPort}/${config.dbName}`;
mongoose.Promise = global.Promise;
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var token = config.telegramBotToken;
var bot = new TelegramBot(token, {polling: true});
// Matches /echo [whatever]
bot.onText(/\/start (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var username = msg.from.username;
  var resp = match[1];
  var client = redis.createClient();
  client.on("error", function (err) {
    console.log("Error " + err);
  });

  client.get(resp, function (err, reply) {
    if (reply) {
      client.del(resp);
      if (resp.slice(0,3) === 'reg') {
        var id = reply.toString();
        User.findById(id, function(err, u) {
          if (!u) {
            bot.sendMessage(fromId, 'Пользователь не найден');
          }
          else {
            User.findOne({ 'telegram': username }, (error, usr) => {
              if (usr) {
                usr.telegram = undefined;
                usr.save(function(err) {
                  if (!err) {
                    bot.sendMessage(fromId, 'Аккаунт telegram отвязан от другой учётной записи');
                    u.telegram = username;

                    u.save(function(err) {
                      if (err) {
                        bot.sendMessage(fromId, 'Не удалось привязать аккаунт telegram');
                      }
                      else
                        bot.sendMessage(fromId, 'Аккаунт telegram успешно привязан');
                    });
                  } else {
                    bot.sendMessage(fromId, 'Не удалось привязать аккаунт telegram');
                  }
                });
              } else {
                u.telegram = username;

                u.save(function(err) {
                  if (err) {
                    bot.sendMessage(fromId, 'Не удалось привязать аккаунт telegram');
                  }
                  else
                    bot.sendMessage(fromId, 'Аккаунт telegram успешно привязан');
                });
              }
            });
          }
        });
      } else if (resp.slice(0,3) === 'ath') {
        if (reply === '_') {
          client.set(resp, `_${username}`);
          client.expire(resp, 300);
          bot.sendMessage(fromId, 'Авторизация подтверждена');
        } else {
          bot.sendMessage(fromId, 'Авторизация отклонена');
        }
      } else {
        bot.sendMessage(fromId, 'Неверная ссылка подтверждения');
      }
    } else {
      bot.sendMessage(fromId, 'Ссылка невалидна (возможно, истёк срок действия)');
    }
    client.quit();
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb',extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users/',express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);
app.use('/users', users);
app.use('/projects', projects);

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
