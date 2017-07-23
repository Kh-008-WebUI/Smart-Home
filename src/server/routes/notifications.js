const express = require('express');
const router = express.Router();
const Notification = require('../models/notification.js');

router.get('/', (req, res) => {
  Notification.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = router;
