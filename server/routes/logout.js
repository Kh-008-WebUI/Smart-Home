const express = require('express');
const logoutRouter = express.Router();
const User = require('../models/user');

logoutRouter.route('/')
  .get((req, res) => {
    if (req.session.user) {
      User.findOne({ '_id': req.session.user },
      (err, user) => {
        if (err) {
          res.statusMessage = "Something went wrong, try again later.";
          res.status(500).end();
        }
        if (!user) {
          res.statusMessage = "Cannot find user.";
          res.status(400).end();
        } else {
          user.home = false;
          user.save().catch(err => {
            res.statusMessage = "Something went wrong, try again later.";
            res.status(500).end();
          });
          req.session.destroy(function (err) {
            if (err) {
              res.statusMessage = "Unable to destroy session.";
              res.status(400).end();
            }
            res.send({});
          });
        }
      });
    } else {
      res.statusMessage = "Your session is unavaliable.";
      res.status(400).end();
    }
  });

module.exports = logoutRouter;
