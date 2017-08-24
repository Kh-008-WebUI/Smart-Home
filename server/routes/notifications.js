const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');
const User = require('../models/user.js');
const moment = require('moment');
const HttpError = require('../errors/HttpError');

notificationRouter.route('/')
 .get((req, res, next) => {
   const { pageNumber = 0, itemsPerPage = 0 } = req.query;
   const todayStartTime = moment().startOf('day').format();
   const userDateCreated = moment(req.session.userCreatedDate).format();

   Notification
    .find({ 'time': { '$gte': (userDateCreated > todayStartTime) ?
      userDateCreated : todayStartTime } })
    .sort({ time: -1 })
    .skip(parseInt(pageNumber > 0 ? (pageNumber - 1) * itemsPerPage : 0))
    .limit(parseInt(itemsPerPage))
    .then(notifications => {
      notifications.forEach((item) => {
        item.viewedByUser.forEach((user) => {
          if ((user.userID + '') === req.session.user) {
            item.viewed = user.status;
          }
        });
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
  });

notificationRouter.route('/history')
 .get((req, res, next) => {
   const { pageNumber = 0, itemsPerPage = 0 } = req.query;
   const todayStartTime = moment().startOf('day').toDate();

   Notification
    .find({ 'time': { '$gte': req.session.userCreatedDate } })
    .sort({ time: -1 })
    .skip(parseInt(pageNumber > 0 ? (pageNumber - 1) * itemsPerPage : 0))
    .limit(parseInt(itemsPerPage))
    .then(notifications => {
      notifications.forEach((item) => {
        item.viewedByUser.forEach((user) => {
          if ((user.userID + '') === req.session.user) {
            item.viewed = user.status;
          }
        });
      });
      res.json(notifications);
    })
    .catch(err => {
      next(new HttpError(400));
    });
 });

notificationRouter.route('/viewed')
  .put((req, res, next) => {
    const todayStartTime = moment().startOf('day').format();
    const userDateCreated = moment(req.session.userCreatedDate).format();

    Notification.find()
    .sort({ time: -1 })
    .then(result => {
      result.forEach((item) => {
        item.viewedByUser.forEach((user) => {
          if ((user.userID + '') === req.session.user) {
            user.status = true;
            item.save();
            item.viewed = true;
          }
        });
      });
      const notificationsToday = result.filter(item => {
        if (userDateCreated > todayStartTime) {
          return moment(item.time).format() > userDateCreated;
        } else {
          return moment(item.time).format() > todayStartTime;
        }
      });
      
      res.json(notificationsToday);
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
