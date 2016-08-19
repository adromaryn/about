'use strict';

const express = require('express');
const router = express.Router();
const Verify = require('./verify');
const User = require('../models/user');

router.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  User.findById(req.decoded._doc._id, function(err, u) {
    if (!u) {
      res.redirect(`/auth`);
    } else {
      res.redirect(`/users/${req.decoded._doc._id}`);
    }
  });
});

module.exports = router;
