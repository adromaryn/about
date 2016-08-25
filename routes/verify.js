"use strict";

var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../server.config.js');

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                res.redirect('/auth');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        res.redirect('/auth');
    }
};

exports.getUser = token => {
  try {
    var decoded = jwt.verify(token, config.secretKey);
  }
  catch(e) {
    return false;
  }
  return decoded._doc;
}
