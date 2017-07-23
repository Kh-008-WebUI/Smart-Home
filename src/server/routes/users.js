const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = router;
