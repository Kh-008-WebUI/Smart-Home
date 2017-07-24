const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

userRouter.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = userRouter;
