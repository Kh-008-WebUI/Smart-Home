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
        res.send(err);
        return;
      }
      if (!user) {
        res.send(`user ${req.params.id} not found in the database`);
        return;
      }
      for (const prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
          user[prop] = req.body[prop];
        }
      }
      user.save((error) => {
        if (error) {
          return res.send(error);
        }
        return res.json(user);
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
