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

notificationRouter.route('/:id')
  .put((req, res) => {
    Notification.findById(req.params.id, (err, notification) => {
      if(err) {
        console.log(err);
      }
      else{
       for(let prop in req.body) {
          notification[prop] = req.body[prop];
        }
        notification.save()
        .then(notification => {
          res.json(notification);
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
})

module.exports = notificationRouter;
