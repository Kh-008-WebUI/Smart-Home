const express = require('express');
const logoutRouter = express.Router();
const User = require('../models/user');
const HttpError = require('../errors/HttpError');
const ws = require('../index');

logoutRouter.route('/')
  .get( (req, res, next) => {
    if (req.session.user) {
      User.findOne({ '_id': req.session.user })
        .then(user => {
          if (!user) {
            next(new HttpError(404));
          } else {
            req.session.destroy(function (err) {
              if (err) {
                next(new HttpError(503))
              }
              ws.send(JSON.stringify({ type: 'users', user: { _id: user._id, home: false } }));
              res.status(200).send({
                userData: {
                  _id: user._id
                }
              });
            });
          }
        })
        .catch(err => {
          next(new HttpError(400));
        });
    } else {
      next(new HttpError(401));
    }
  });

module.exports = logoutRouter;
