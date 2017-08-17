const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');
const User = require('../models/user.js');
const moment = require('moment');

notificationRouter.route('/')
  .get((req, res) => {
    console.log(req.session.user);
    console.log(req.session.userCreatedDate);
    Notification
    .find({ 'time': { '$gte': req.session.userCreatedDate ?
      req.session.userCreatedDate : new Date(2017, 1, 1) },
      'viewedByUser.userID': req.session.user
    },
      { 'emergency': '$all',
        'text': '$all',
        'viewedByUser': { $elemMatch: { userID: req.session.user } },
        'time': '$all',
        'viewed': '$all'
      }
    )
    .sort({ time: -1 })
    .then(notifications => {
      notifications.forEach((item) => {
        item.viewed = item.viewedByUser[0].status;
      });
      res.json(notifications);
    })
    .catch(err => {
      res.statusMessage = 'Something went wrong, try again later.';
      res.status(500).end();
    });
  })
  .post((req, res) => {
    const notification = new Notification(req.body);

    notification.time = Date.now();
    notification.viewed = false;

    notification.save()
      .then(notifications => {
        res.json({ notification });
      })
      .catch(err => {
        res.statusMessage = 'Failed to send notification.';
        res.status(500).end();
      });
  });

notificationRouter.route('/:id')
  .get((req, res) => {
    Notification
      .findById(req.params.id)
      .then(notification => {
        res.send(notification);
      })
      .catch(err => {
        res.statusMessage = 'Failed to find notification.';
        res.status(500).end();
      });
  })
  .put((req, res) => {
    Notification
      .findOne({ _id: req.params.id })
      .then(notification => {
        notification.viewedByUser.forEach((item) => {
          if (item.userID == req.session.user) {
            item.status = req.body.viewed;
            notification.viewed = item.status;
          }
        });
        notification.save()
          .then(() => {
            res.json(notification);
          })
          .catch(error => {
            res.statusMessage = 'Failed to save notification.';
            res.status(500).end();
          });
      })
      .catch(err => {
        res.send(err);
      });
  })
  .delete((req, res) => {
    Notification
      .findByIdAndRemove(req.params.id)
      .then(notification => {
        res.send({
          message: 'Note successfully deleted',
          id: req.params.id
        });
      })
      .catch(err => {
        res.statusMessage = 'Failed to delete notification.';
        res.status(500).end();
      });
  });

module.exports = notificationRouter;
