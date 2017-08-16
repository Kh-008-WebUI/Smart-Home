const express = require('express');
const loginRouter = express.Router();
const User = require('../models/user');
const HttpError = require('../errors/HttpError');

loginRouter.route('/')
  .get( (req, res, next) => {
    User.findOne({ '_id': req.session.user })
      .then(user => {
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
      .catch(err => (next(new HttpError(503))));
  })
  .post( (req, res, next) => {
    User.findOne({ 'email': req.body.email })
      .then(user => {
        if (user && user.checkPassword(req.body.password)) {
          req.session.user = user._id;
          req.session.name = user.name;
          req.session.userCreatedDate = user.created;
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
              next(new HttpError(503));
            });
        } else {
          next(new HttpError(403));
        }
      })
      .catch(err => {
        next(new HttpError(400));
      });
  });

module.exports = loginRouter;
