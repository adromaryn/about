'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Verify = require('./verify');

router.route('/')
.post(Verify.verifyOrdinaryUser, (req, res, next) => {
  User.findById(req.decoded._doc._id, (err, u) => {
    if (!u)
      res.status(401).json({});
    else if (u.projects.length >= 3)
      res.status(422).json({errors: 'limit'});
    else {
      u.projects.push({title: req.body.title, content: req.body.content});
      u.save(err => {
        if (!err)
          res.status(200).json({projects: u.projects});
        else if (err.name == 'ValidationError')
          res.status(400).json({});
        else
          res.status(500).json({});
      });
    }
  });
});

router.route('/:num')
.delete(Verify.verifyOrdinaryUser, (req, res, next) => {
  User.findById(req.decoded._doc._id, (err, u) => {
    if (!u) {
      res.status(401).json({});
    } else {
      if (u.projects.length < +req.params.num + 1) {
        res.status(400).json({});
      } else {
        var projectId = u.projects[req.params.num].id
        User.findOneAndUpdate( {'projects._id' : projectId} ,
          {
            $pull: { projects: { _id: projectId }}
          },
          {new: true},
          function(err, doc) {
            if (err) res.status(500).json({});
            else res.status(200).json({});
        });
      }
    }
  });
});

module.exports = router;
