const express = require('express');
const registerRouter = express.Router();
const User = require('../models/user');
const HttpError = require('../errors/HttpError');

registerRouter.route('/').post( (req, res, next) => {
  User.find({ email: req.body.email })
    .then( user => {
      if (user.length > 0) {
        next(new HttpError(409));
      } else {
        User.create(req.body)
          .then( user => {
            req.session.user = user._id;
            req.session.name = user.name;
            res.status(200).send({
              status: true,
              userData: {
                _id: user._id,
                name: user.name,
                email: user.email,
                created: user.created
              }
            });
          })
          .catch( err => {
            next(new HttpError(503));
          })
      }
    })
    .catch( err => {
      next(new HttpError(503));
    });
});

module.exports = registerRouter;
