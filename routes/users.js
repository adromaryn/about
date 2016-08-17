'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Verify    = require('./verify');
const path = require('path');
const fs = require('fs');
const util = require("util");
const mime = require("mime");

router.get('/:id', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.redirect('/');
    } else {
      var userStatus;
      var src = `../public/${user.username}/ava.png`;
      fs.readFile(path.join(__dirname, src), function(err, data) {
        var avatar;
        if (err) {
          avatar = undefined;
        } else {
          avatar = util.format("data:%s;base64,%s", mime.lookup(src), data.toString('base64'));
        }
        if (token) {
          userStatus = Verify.verifyToken(token, req.params.id) ? "owner" : "guest";
        }
        res.render('index', {user: user, userStatus: userStatus, ava: avatar});
      });
    }
  });
  //
});

router.route('/avatar')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  var avatar = req.body.avatar.replace(/^data:image\/png;base64,/, "");
  try {
    fs.mkdir(path.join(__dirname, `../public/${req.decoded._doc.username}`), function(e){
      if (avatar!=''){
        var ava = new Buffer(avatar, 'base64');
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
  //
});

module.exports = router;
