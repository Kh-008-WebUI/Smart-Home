const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');
const HttpError = require('../errors/HttpError');

userRouter.route('/')
  .get( (req, res, next) => {
    User.find()
      .then( users => {
        res.json(users);
      })
      .catch( err => (next(new HttpError(404))));
  })
  .post( (req, res, next) => {
    const user = new User(req.body);

    user.save()
      .then( users => {
        res.json({ message: 'User created' });
      })
      .catch( err => (next(new HttpError(503))));
  });

userRouter.route('/:id')
  .get( (req, res, next) => {
    User.findById(req.params.id)
      .then( user => {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created
          });
      })
      .catch( err => (next(new HttpError(404))));
  })
  .put( (req, res, next) => {
    User.findById(req.params.id)
      .then( user => {
        if (!user) {
          next(new HttpError(400));
        }
        User.findOne({ email: req.body.email })
        .then(
          userByEmail => {
            if (userByEmail._id.toString() !== user._id.toString()) {
              next(new HttpError(409));
              return;
            }
          }
        );
        Object.assign(user, req.body);
        user.save((error) => {
          if (error) {
            next(new HttpError(503));
          }
          return res.json(user);
        });
      })
      .catch( err => (next(new HttpError(500))));
  })
  .delete( (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then( user => {
        res.send({
          message: 'note successfully deleted',
          id: req.params.id
        });
      })
      .catch( err => (next(new HttpError(503))));
  });

module.exports = userRouter;
