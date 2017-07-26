const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');

notificationRouter.route('/')
  .get((req, res) => {
    Notification.find((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  })
  .post((req, res) => {
    const notification = new Notification();

    notification.text = req.body.text;
    notification.time = req.body.time;
    notification.viewed = req.body.viewed;
    notification.save((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'notification created' });
    });
  });

module.exports = notificationRouter;
