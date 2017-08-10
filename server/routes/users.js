const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

userRouter.route('/')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        res.statusMessage = 'Failed to find user.';
        res.status(500).end();
      }
      res.json(users);
    });
  })
  .post((req, res) => {
    const user = new User(req.body);

    user.save((err, users) => {
      if (err) {
        res.statusMessage = 'Failed to save.';
        res.status(500).end();
      }
      res.json({ message: 'User created' });
    });
  });

userRouter.route('/:id')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      } else {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          created: user.created
        });
      }
    });
  })
  .put((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      }
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
    });
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        res.statusMessage = 'Failed to delete.';
        res.status(500).end();
      } else {
        res.send({
          message: 'note successfully deleted',
          id: req.params.id
        });
      }
    });
  });

module.exports = userRouter;
