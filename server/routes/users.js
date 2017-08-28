const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');
const HttpError = require('../errors/HttpError');
const ws = require('../index');

userRouter.route('/')
  .get((req, res, next) => {
    User.find()
      .then(users => {
        res.json(users);
        ws.send(JSON.stringify({ type: 'initUsers' }));
      })
      .catch(err => (next(new HttpError(404))));
  })
  .post((req, res, next) => {
    const user = new User(req.body);

    user.save()
      .then(users => {
        res.json({ message: 'User created' });
      })
      .catch(err => (next(new HttpError(503))));
  });

userRouter.route('/:id')
  .get((req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          created: user.created
        });
      })
      .catch(err => (next(new HttpError(404))));
  })

  .put((req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          throw new HttpError(404);
        }
        User.findOne({ email: req.body.email })
          .then(userByEmail => {
            if (userByEmail
              && userByEmail._id.toString() !== user._id.toString()) {
              throw new HttpError(409);
            }
            if (req.body.password && (!req.body.passwordOld ||
              !user.checkPassword(req.body.passwordOld))) {
              throw new HttpError(403);
            }
            Object.assign(user, req.body);
            user.save(error => {
              if (error) {
                next(new HttpError(503));
              }
              return res.json(user);
            }
            );
          }
          ).catch(err => (next(new HttpError(err.status))));
      })
      .catch(err => (next(new HttpError(err.status))));
  })

  .delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.send({
          message: 'note successfully deleted',
          id: req.params.id
        });
      })
      .catch(err => (next(new HttpError(503))));
  });

module.exports = userRouter;
