'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Verify    = require('./verify');
const path = require('path');
const fs = require('fs');
const util = require('util');
const mime = require('mime');
const redis = require('redis');
const crypto = require('crypto');

router.get('/:id', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      res.redirect('/');
    } else {
      var userStatus;
      var src = `../public/${user.username}/ava.png`;
      fs.readFile(path.join(__dirname, src), function(err, data) {
        var avatar;
        if (err) {
          avatar = null;
        } else {
          avatar = util.format("data:%s;base64,%s", mime.lookup(src), data.toString('base64'));
        }
        var decodedUser = Verify.getUser(token);
        if (decodedUser) {
          userStatus = decodedUser.username === user.username ? "owner" : "guest";
        } else {
          userStatus = null;
        }
        user.answer = undefined;
        user.question = undefined;
        res.render('index', {user: user, userStatus: userStatus, ava: avatar});
      });
    }
  });
});

router.route('/avatar')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  var avatar = req.body.avatar.replace(/^data:image\/png;base64,/, "");
  try {
    fs.mkdir(path.join(__dirname, `../public/${req.decoded._doc.username}`), (e)=>{
      if (avatar!=''){
        fs.writeFile(path.join(__dirname, `../public/${req.decoded._doc.username}/ava.png`),
          avatar,
          'base64', (e)=>{
            if (e) {
              res.status(500).json({status: 'Avatar not updated!'});
            } else {
              res.status(200).json({status: 'Avatar updated successfully!'});
            }
          });
      }
    });
  } catch (err){
    res.status(500).json({status: 'Avatar not updated!'});
  }
})

.delete(Verify.verifyOrdinaryUser, (req, res, next) => {
  fs.unlink(path.join(__dirname, `../public/${req.decoded._doc.username}/ava.png`), e => {
    if (e) {
      console.log(err);
      res.status(500).json({status: 'Avatar not deleted!'});
    } else {
      res.status(200).json({status: 'Avatar deleted successfully!'});
    }
  });
});

router.route('/name')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.status(500).json({status: 'Name not updated!'});
    }
    else {
      u.name = req.body.name;

      u.save(function(err) {
        if (err) {
          res.status(500).json({status: 'Name not updated!'});
        }
        else
          res.status(200).json({status: 'Name updated successfully!'});
      });
    }
  });
});

router.route('/resume')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.status(500).json({status: 'Resume not updated!'});
    }
    else {
      u.resume = req.body.resume;

      u.save(function(err) {
        if (err) {
          res.status(500).json({status: 'Resume not updated!'});
        }
        else
          res.status(200).json({status: 'Resume updated successfully!'});
      });
    }
  });
});

router.route('/about')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.status(500).json({status: 'About not updated!'});
    }
    else {
      u.about = req.body.about;

      u.save(function(err) {
        if (err) {
          res.status(500).json({status: 'About not updated!'});
        }
        else
          res.status(200).json({status: 'About updated successfully!'});
      });
    }
  });
});

router.route('/contacts/telegram/reg')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.status(500).json({});
    }
    else {
      var client = redis.createClient();
      var token = crypto.randomBytes(15).toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
      client.on("error", function (err) {
        console.log("Error " + err);
      });
      client.set(`reg${token}`, req.decoded._doc._id );
      client.expire(`reg${token}`, 300);
      client.quit();
      res.status(200).json({token: `reg${token}`});
    }
  });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.status(500).json({});
    }
    else {
      u.telegram = '';
      u.save(function(err) {
        if (err)
          res.status(500).json({status: 'no'});
        else
          res.status(200).json({status: 'ok'});
      });
    }
  });
});

router.route('/contacts/telegram/:pas')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.status(500).json({});
    }
    else {
      var client = redis.createClient();
      client.on("error", function (err) {
        console.log("Error " + err);
      });
      var token = req.params.pas;
      var timeoutId = setTimeout(()=>{
        clearInterval(intervalId);
        client.quit();
        try {
          res.status(200).json({telegram: u.telegram});
        } catch (err) {
        }
      }, 300000);
      var intervalId = setInterval(()=>{
        client.get(token, function (err, reply) {
          if (! reply) {
            clearTimeout(timeoutId);
            client.quit();
            User.findById(req.decoded._doc._id, function(err, usr) {
              if (!usr) {
                try {
                  res.status(500).json({});
                } catch(e) {
                }
              } else {
                try {
                  res.status(200).json({telegram: usr.telegram});
                } catch(e) {
                }
              }
            });
          }
        });
      },1000);
    }
  });
});

module.exports = router;
