const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

userRouter.route('/')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  })
  .post((req, res) => {
    const user = new User(req.body);

    user.save((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User created' });
    });
  });

userRouter.route('/:id')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  })
  .put((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      }
      for (let prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
          user[prop] = req.body[prop];
        }
      }
      user.save((error) => {
        if (error) {
          return res.send(error);
        }
        res.json(user);
      });
    });
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: 'note successfully deleted',
          id: req.params.id
        });
      }
    });
  });

module.exports = userRouter;
