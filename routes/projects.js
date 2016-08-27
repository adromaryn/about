'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Verify = require('./verify');

router.route('/projects')
.post(Verify.verifyOrdinaryUser, (req, res, next) => {
  User.findById(req.decoded._doc._id, (err, u) => {
    u.projects.push({title: req.body.title, about: req.body.about});
    u.save(err => {
      if err console.log(err)
    });
  });
})
