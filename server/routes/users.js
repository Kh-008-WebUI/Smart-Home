const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

userRouter.route('/')
  .get((req, res) => {
    User.find()
      .then( users => {
        res.json(users);
      })
      .catch( err => {
        res.statusMessage = 'Failed to find user.';
        res.status(500).end();
      })
  })
  .post((req, res) => {
    const user = new User(req.body);

    user.save()
      .then( users => {
        res.json({ message: 'User created' });
      })
      .catch( err => {
        res.statusMessage = 'Failed to save.';
        res.status(500).end();
      });
  });

userRouter.route('/:id')
  .get((req, res) => {
    User.findById(req.params.id)
      .then( user => {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created
          });
      })
      .catch( err => {
          res.statusMessage = 'Something went wrong, try again later.';
          res.status(500).end();
      });
  })
  .put((req, res) => {
    User.findById(req.params.id)
      .then( user => {
        if (!user) {
          res.statusMessage = 'Something went wrong, try again later.';
          res.status(500).end();
        }
        Object.assign(user, req.body);
        user.save((error) => {
          if (error) {
            res.statusMessage = 'Failed to save.';
            res.status(500).end();
          }
          return res.json(user);
        });
      })
      .catch( err => {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      })
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then( user => {
        res.send({
          message: 'note successfully deleted',
          id: req.params.id
        });
      })
      .catch( err => {
        res.statusMessage = 'Failed to delete.';
        res.status(500).end();
      });
  });

module.exports = userRouter;
