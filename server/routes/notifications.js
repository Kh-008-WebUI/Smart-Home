const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');

notificationRouter.get('/', (req, res) => {
  Notification.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = notificationRouter;
