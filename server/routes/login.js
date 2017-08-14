const express = require('express');
const loginRouter = express.Router();
const User = require('../models/user');

loginRouter.route('/')
  .get((req, res) => {
    User.findOne({ '_id': req.session.user })
      .then( user => {
        if (!user) {
          res.send({ userData: {} });
        } else {
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
        }
      })
      .catch( err => {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      });
  })
  .post((req, res) => {
    User.findOne({ 'email': req.body.email })
      .then( user => {
        if (user && user.checkPassword(req.body.password)) {
          req.session.user = user._id;
          req.session.name = user.name;
          user.home = true;
          user.save()
            .then(() => {
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
            })
            .catch(err => {
              res.statusMessage = 'Unable to update the database.';
              res.status(500).end();
            });
        } else {
          res.statusMessage = 'You have entered an incorrect email or password.';
          res.status(500).end();
        }
      })
      .catch( err => {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      })
  });

module.exports = loginRouter;
