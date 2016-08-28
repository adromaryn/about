'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Verify = require('./verify');

router.route('/')
.post(Verify.verifyOrdinaryUser, (req, res, next) => {
  User.findById(req.decoded._doc._id, (err, u) => {
    u.projects.push({title: req.body.title, content: req.body.content});
    u.save(err => {
      if (!err)
        res.status(200).json({projects: u.projects});
      else if (err.name == 'ValidationError')
        res.status(400).json({});
      else
        res.status(500).json({});
    });
  });
})

module.exports = router;
