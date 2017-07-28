const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');

notificationRouter.route('/')
  .get((req, res) => {
    Notification.find((err, notifications) => {
      if (err) {
        res.send(err);
      }
      res.json(notifications);
    });
  })
  .post((req, res) => {
    const notification = new Notification(req.body);

    notification.save((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'notification created' });
    });
  });

notificationRouter.route('/:id')
  .get((req, res) => {
    Notification.findById(req.params.id, (err, notification) => {
      if (err) {
        res.send(err);
      } else {
        res.send(notification);
      }
    });
  })
  .put((req, res) => {
    Notification.findById(req.params.id, (err, notification) => {
      if (err) {
        res.send(err);
      }
      for (let prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
          notification[prop] = req.body[prop];
        }
      }
      notification.save((error) => {
        if (error) {
          return res.send(error);
        }
        res.json(notification);
      });
    });
  })
  .delete((req, res) => {
    Notification.findByIdAndRemove(req.params.id, (err, notification) => {
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

module.exports = notificationRouter;
