'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var fs = require('fs');
var User = require('../models/user');
const path = require('path');
var Verify    = require('./verify');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth');
});

router.post('/', function(req, res) {
    console.log(req.body);
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
        question: question,
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
          var avatar = req.body.avatar;
          console.log()
          try {
            fs.mkdir(path.join(__dirname, `../public/${username}`), function(e){

            });
            if (avatar!=''){
              var ava = new Buffer(avatar, 'base64');
              fs.writeFile(path.join(__dirname, `../public/${username}/ava.png`));
            }
          } catch (err){

          }
          console.log('222');
        }
        passport.authenticate('local')(req, res, function () {
          console.log('111');
          return res.status(200).json({status: 'Registration Successful!'});
        });
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

module.exports = router;
