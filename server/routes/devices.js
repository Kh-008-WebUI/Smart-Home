const express = require('express');
const devicesRouter = express.Router();
const Device = require('../models/device');
const ws = require('../index');
const moment = require('moment');
const Notification = require('../models/notification.js');
const User = require('../models/user.js');
const HttpError = require('../errors/HttpError');
const findAllUsers = require('../utils/findAllUsers.js');

devicesRouter.route('/').get((req, res, next) => {
  Device.find()
    .sort({ views: -1 })
    .then(devices => {
      res.json(devices);
    })
    .catch(err => (next(new HttpError(400))));
});

devicesRouter.route('/').post((req, res, next) => {
  const device = req.body;

  device.status = true;
  device.createdDate = moment().format('LL');
  device.createdBy = req.session.name;

  Device
    .create(device)
    .then(device => {
      let userList = [];

      User.find()
      .then(users => {
        userList = [...users];
      })
      .then(() => {
        let arr = [];

        userList.forEach((item) => {
          const objItem = {
            userID: item._id,
            status: false
          };

          arr.push(objItem);
        });
        const notification = new Notification({
          time:  Date.now(),
          text: `${device.name} was created`,
          viewedByUser: arr
        });

        Notification.create(notification);
        ws.send(JSON.stringify({ type: 'notification' }));
        res.json(device);
      });
    })
    .catch( err => next(new HttpError(503)));
});

devicesRouter.route('/device/:id').get((req, res, next) => {
  const id = req.params.id;

  Device
    .findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true })
    .then(device => {
      if (!device) {
        next(new HttpError(404));
      }
      res.json(device);
    })
    .catch( err => {
      next(new HttpError(404));
    })
});

devicesRouter.route('/:id').delete((req, res, next) => {
  const id = req.params.id;

  Device
    .findOneAndRemove({ _id: id })
    .then(device => {
      let userList = [];

      User.find()
      .then(users => {
        userList = [...users];
      })
      .then(() => {
        let arr = [];

        userList.forEach((item) => {
          const objItem = {
            userID: item._id,
            status: false
          };

          arr.push(objItem);
        });

        const notification = new Notification({
          time:  Date.now(),
          text: `${device.name} was deleted`,
          emergency: true,
          viewedByUser: arr
        });

        Notification.create(notification);

        ws.send(JSON.stringify({ type: 'notification' }));
        res.json(id);
      });
    })
    .catch(err => (next(new HttpError(501))));
});

devicesRouter.route('/:id').put((req, res, next) => {
  const id = req.params.id;

  Device
    .findOne({ _id: id })
    .then(device => {
      if(!device){
        return next(new HttpError(410));
      }
      Object.assign(device, req.body);
      if (Object.keys(req.body).length > 1) {
        device.updetedDate = moment().format('LL');
      }
      device.save()
        .then(device => {
          if (Object.keys(req.body).length  === 1) {


            let userList = [];

            User.find()
            .then(users => {
              userList = [...users];
            })
            .then(() => {
              let arr = [];

              userList.forEach((item) => {
                const objItem = {
                  userID: item._id,
                  status: false
                };

                arr.push(objItem);
              });


            const notification = new Notification({
              time:  Date.now(),
              text: `${device.name} is ${device.status ? 'on' : 'off'}`,
              viewedByUser: arr
            });

            Notification.create(notification);

            ws.send(JSON.stringify({ type: 'notification' }));
            });
          }
          res.json(device);
        })
        .catch(err => (next(new HttpError(400))));
    })
    .catch(err => (next(new HttpError(410))));
});

devicesRouter.route('/items/:id/:setting').put( (req, res, next) => {
  const id = req.params.id;
  const setting = req.params.setting;

  Device
    .findOne({ _id: id })
    .then(device => {
      const items = device.items;

      items[setting].data = req.body.value;

      device.items = items;

      device.markModified('items');

      device.save()
        .then(device => {
          res.json(device);
        })
        .catch(err => (next(new HttpError(503))));
    })
    .catch( err => (next(new HttpError(503))));
});

module.exports = devicesRouter;
