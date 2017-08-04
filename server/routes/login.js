const express = require('express');
const loginRouter = express.Router();
const User = require('../models/user');

loginRouter.route('/')
  .get((req, res) => {
    User.findOne({ '_id': req.session.user },
    (err, user) => {
      if (err) {
        res.status(500).send({
          status: 'error',
          text: 'Something went wrong, try again later.'
        });
      }
      if (user) {
        res.status(200).send({
          status: true,
          userData: {
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created,
            avatar: user.avatar
          }
        });
      } else {
        res.status(500).send({
          status: 'error',
          text: 'Cannot find user.'
        });
      }
    });
  })
  .post((req, res) => {
    User.findOne({ 'email': req.body.email },
    (err, user) => {
      if (err) {
        res.statusMessage = "Something went wrong, try again later.";
        res.status(500).end();
      }
      if (user && user.checkPassword(req.body.password)) {
        req.session.user = user._id;
        user.home = true;
        user.save().catch(err => {
          res.statusMessage = "Unable to update the database.";
          res.status(500).end();
        });
        res.status(200).send({
          status: true,
          userData: {
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created,
            avatar: user.avatar
          }
        });
      } else {
        res.statusMessage = "You have entered an incorrect email or password.";
        res.status(500).end();
      }
    });
  });

module.exports = loginRouter;
