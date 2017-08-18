const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');
const User = require('../models/user.js');
const moment = require('moment');
const HttpError = require('../errors/HttpError');

notificationRouter.route('/')
 .get((req, res, next) => {
   Notification
    .find({ 'time': { '$gte': req.session.userCreatedDate ?
      req.session.userCreatedDate : new Date(2017, 1, 1) },
      'viewedByUser.userID': req.session.user
    },
     {
       'emergency': '$all',
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
      next(new HttpError(400));
    });
 })
  .post((req, res, next) => {
    const notification = new Notification(req.body);

    notification.time = Date.now();
    notification.viewed = false;

    notification.save()
      .then(notifications => {
        res.json({ notification });
      })
      .catch(err => {
        next(new HttpError(503));
      });
  })
  .put((req, res, next) => {
    Notification.update(
      { 'viewedByUser.userID': '5981c3fca39e9b12ea86a176' },
      { $set:  { 'viewedByUser.$.status': req.body.status } },
      { 'multi': true })
    .then(result => {
      console.log(req.body.status);
      res.status(200)
      .json(result);
    })
    .catch(err => {
      next(new HttpError(503));
    });
  });

notificationRouter.route('/:id')
  .get((req, res, next) => {
    Notification
      .findById(req.params.id)
      .then(notification => {
        res.send(notification);
      })
      .catch(err => {
        next(new HttpError(404));
      });
  })
  .put((req, res, next) => {
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
            next(new HttpError(503));
          });
      })
      .catch(err => {
        next(new HttpError(500));
      });
  })
  .delete((req, res, next) => {
    Notification
      .findByIdAndRemove(req.params.id)
      .then(notification => {
        res.send({
          message: 'Note successfully deleted',
          id: req.params.id
        });
      })
      .catch(err => {
        next(new HttpError(503));
      });
  });

module.exports = notificationRouter;
