const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');

notificationRouter.route('/')
  .get((req, res) => {
    Notification.find((err, notifications) => {
      if (err) {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      }
      res.json(notifications);
    }).sort({ time: -1 });
  })
  .post((req, res) => {
    const notification = new Notification(req.body);

    notification.time = Date.now();
    notification.viewed = false;

    notification.save((err, users) => {
      if (err) {
        res.statusMessage = 'Failed to send notification.';
        res.status(500).end();
      } else {
        res.json({ notification });
      }
    });
  });

notificationRouter.route('/:id')
  .get((req, res) => {
    Notification.findById(req.params.id, (err, notification) => {
      if (err) {
        res.statusMessage = 'Failed to find notification.';
        res.status(500).end();
      } else {
        res.send(notification);
      }
    });
  })
  .put((req, res) => {
    Notification.findOne({ _id: req.params.id }, (err, notification) => {
      if (err) {
        res.send(err);
      } else {
        for (let prop in req.body) {
          if (req.body.hasOwnProperty(prop)) {
            notification[prop] = req.body[prop];
          }
        }
        notification.save((error) => {
          if (error) {
            res.statusMessage = 'Failed to save notification.';
            res.status(500).end();
          }
          res.json(notification);
        });
      }
    });
  })
  .delete((req, res) => {
    Notification.findByIdAndRemove(req.params.id, (err, notification) => {
      if (err) {
        res.statusMessage = 'Failed to delete notification.';
        res.status(500).end();
      } else {
        res.send({
          message: 'Note successfully deleted',
          id: req.params.id
        });
      }
    });
  });

module.exports = notificationRouter;
