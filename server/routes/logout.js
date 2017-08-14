const express = require('express');
const logoutRouter = express.Router();
const User = require('../models/user');

logoutRouter.route('/')
  .get((req, res) => {
    if (req.session.user) {
      User.findOne({ '_id': req.session.user })
        .then(user => {
          if (!user) {
            res.statusMessage = 'Cannot find user.';
            res.status(400).end();
          } else {
            user.home = false;
            user.save()
              .then(() => {
                req.session.destroy(function (err) {
                  if (err) {
                    res.statusMessage = 'Unable to destroy session.';
                    res.status(400).end();
                    return;
                  }
                  res.status(200).send({ userData: {
                    _id: user._id
                  }
                  });
                });
              })
              .catch(err => {
                res.statusMessage = 'Something went wrong, try again later.';
                res.status(500).end();
              });
          }
        })
        .catch(err => {
          res.statusMessage = 'Something went wrong, try again later.';
          res.status(500).end();
        });
    } else {
      res.statusMessage = 'Your session is unavaliable.';
      res.status(400).end();
    }
  });

module.exports = logoutRouter;
