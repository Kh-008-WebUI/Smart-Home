const express = require('express');
const logoutRouter = express.Router();
const User = require('../models/user');

logoutRouter.route('/')
  .get((req, res) => {
    if (req.session.user) {
      User.findOne({ '_id': req.session.user },
      (err, user) => {
        if (err) {
          res.status(500).send({
            status: 'error',
            text: 'Something went wrong, try again later.'
          });
        }
        if (user) {
          user.home = false;
          user.save().catch(err => {
            res.status(400).send({
              status: 'error',
              text: 'Cannot find user.'
            });
          });
          req.session.destroy(function (err) {
            if(err) res.status(400).send('unable to destroy session');
          });
          res.status(200).send({
            status: true
          });
        }
        else {
          res.status(500).send({
            status: 'error',
            text: 'Cannot find user.'
          });
        }
      });
    } else {
      res.status(500).send({
        status: 'error',
        text: 'Your session is unavaliable.'
      });
    }
  });

module.exports = logoutRouter;
>>>>>>> 334a05bc2735161ae56bb4fdab99d6930514d2a4
