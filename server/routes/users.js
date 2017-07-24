const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

userRouter.route('/')
  .get((req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  })
  .post((req, res) => {
    const user = new User();

    user.name = req.body.name;
    user.home = req.body.home;
    user.save((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'user created' });
    });
  });

userRouter.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.send.user;
    // user ? res.send.user : res.send('No user find with that ID');
  });
});

module.exports = userRouter;
