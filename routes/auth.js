'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const fs = require('fs');
const User = require('../models/user');
const path = require('path');
const crypto = require('crypto');
const Verify = require('./verify');
const redis = require('redis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth');
});

router.post('/', function(req, res) {
    let errors = [];
    let username = req.body.username;
    if (username == undefined || username == '') {
      errors.push("Необходим никнейм");
    } else if (! username.match(/^[0-9a-zA-Z\-]+$/)) {
      errors.push("Никнейм должен содержать только латинские буквы, цифры и дефис");
    }
    let password = req.body.password;
    let passwordConfirmation = req.body.passwordConfirmation;
    if (password == undefined) {
      errors.push("Необходим пароль");
    } else {
      if (password != passwordConfirmation) {
        errors.push("Пароли не совпадают");
      }
      if (password.length < 6) {
        errors.push("Пароль должен быть не меньше 6 символов");
      }
    }
    let question = req.body.question;
    let answer = req.body.answer;
    if (question == undefined || question == '') {
      errors.push("Необходим вопрос");
    }
    if (answer == undefined || answer == '') {
      errors.push("Необходим ответ на вопрос");
    }
    let name = req.body.name;
    if (name == undefined) {
      errors.push("Необходимо имя");
    }
    let resume = req.body.resume;
    let about = req.body.about;
    if (resume == undefined) {
      errors.push("Необходимо резюме");
    }
    if (about == undefined) {
      errors.push("Необходим раздел о себе");
    }
    if (errors.length > 0) {
      res.status = 400;
      res.json({"errors": errors});
    } else {
      User.register(new User({ username : username,
        question: crypto.createHash('md5').update(question).digest("hex"),
        answer: answer,
        name: name,
        resume: resume,
        about: about }),
        password, function(err, user) {
        if (err) {
          if (err.name == 'UserExistsError') {
            res.status = 400;
            res.json({"errors": ["Пользователь с таким никнеймом уже зарегестрирован"]});
          } else {
            res.status = 500;
            return res.json({err: err});
          }
        } else {
          try {
            fs.mkdir(path.join(__dirname, `../public/${username}`), function(e){
              if (req.body.avatar) {
                var avatar = req.body.avatar.replace(/^data:image\/png;base64,/, "");
                fs.writeFile(path.join(__dirname, `../public/${username}/ava.png`),
                  avatar,
                  'base64', (e)=>{});
              } else {
                fs.unlink(path.join(__dirname, `../public/${username}/ava.png`), (e)=>{});
              }
            });
          } catch (err){
            console.log(err);
          }
          passport.authenticate('local')(req, res, function () {
            res.status(200).json({status: 'Registration Successful!'});
          });
        }
      });
    }
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.route('/telegram')
.post((req, res, next) => {
  var client = redis.createClient();
  var token = crypto.randomBytes(15).toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
  client.on("error", function (err) {
    console.log("Error " + err);
  });
  client.set(`ath${token}`, '_' );
  client.expire(`ath${token}`, 300);
  client.quit();
  res.status(200).json({token: `ath${token}`});
});

router.route('/telegram/:pas')
.get((req, res, next) => {
  var client = redis.createClient();
  client.on("error", function (err) {
    console.log("Error " + err);
  });
  var token = req.params.pas;
  var timeoutId = setTimeout(()=>{
    clearInterval(intervalId);
    client.quit();
    try {
      res.status(401).json({});
    } catch (err) {
    }
  }, 300000);
  var intervalId = setInterval(()=>{
    client.get(token, function (err, reply) {
      if (!reply) {
        clearTimeout(timeoutId);
        client.quit();
        try {
          res.status(401).json({});
        } catch(e) {
        }
        clearInterval(intervalId);
      } else if (reply.length > 1 && reply[0] == '_') {
        clearTimeout(timeoutId);
        client.quit();
        var telegram = reply.slice(1, reply.length);
        User.findOne({ 'telegram': telegram }, (err, user) => {
          if (!user) {
            try {
              res.status(401).json({});
            } catch(e) {
            }
          } else {
            req.logIn(user, function(err) {
              if (err) {
                try {
                  res.status(401).json({});
                } catch(e) {
                }
              } else {
                var tkn = Verify.getToken(user);
                try {
                  res.status(200).json({
                    status: 'Login successful!',
                    success: true,
                    token: tkn
                  });
                } catch(e) {
                }
              }
            });
          }
        });
        clearInterval(intervalId);
      }
    });
  },1000);
});

module.exports = router;
