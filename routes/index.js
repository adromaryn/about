'use strict';

var express = require('express');
var router = express.Router();
var Verify = require('./verify');

router.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  res.redirect(`/users/${req.decoded._doc._id}`);
});

module.exports = router;
