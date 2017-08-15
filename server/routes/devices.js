const express = require('express');
const devicesRouter = express.Router();
const Device = require('../models/device');
const ws = require('../index');
const moment = require('moment');
const Notification = require('../models/notification.js');

devicesRouter.route('/').get((req, res) => {
  Device.find()
    .sort({ views: -1 })
    .then( devices => {
      res.json(devices);
    })
    .catch( err => {
      res.status(500).send({
        status: 'error',
        text: 'Something went wrong, try again later.'
      });
    })
});

devicesRouter.route('/').post((req, res) => {
  const device = req.body;

  device.status = true;
  device.createdDate = moment().format('LL');
  device.createdBy = req.session.name;

  Device.create(device)
    .then( device => {
      const notification = new Notification({
        time:  Date.now(),
        text: `${device.name} was created`,
      });

      Notification.create(notification);

      ws.send(JSON.stringify({ type: 'notification' }));
      res.json(device);
    })
    .catch( err => {
      res.status(500).send({
        status: 'error',
        text: 'Could not add the device.'
      });
    })
});

devicesRouter.route('/device/:id').get((req, res) => {
  const id = req.params.id;

  Device.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true })
    .then( device => {
      if (!device) {
        res.statusMessage = 'Not found';
        res.status(404).end();
        return;
      }
      res.json(device);
    })
    .catch( err => {
      res.statusMessage = 'Something went wrong, try again later.';
      res.status(500).end();
    })
});

devicesRouter.route('/:id').delete((req, res) => {
  const id = req.params.id;

  Device.findOneAndRemove({ _id: id })
    .then( device => {
      const notification = new Notification({
        time:  Date.now(),
        text: `${device.name} was deleted`,
        emergency: true
      });

      Notification.create(notification);

      ws.send(JSON.stringify({ type: 'notification' }));
      res.json(id);
    })
    .catch(err => {
      res.statusMessage = 'Something went wrong, could not delete the device.';
      res.status(500).end();
    })
});

devicesRouter.route('/:id').put((req, res) => {
  const id = req.params.id;

  Device.findOne({ _id: id })
    .then( device => {
      Object.assign(device, req.body);
      if (Object.keys(req.body).length > 1) {
        device.updetedDate = moment().format('LL');
      }
      device.save()
        .then(device => {
          if (Object.keys(req.body).length  === 1) {
            const notification = new Notification({
              time:  Date.now(),
              text: `${device.name} is ${device.status ? 'on' : 'off'}`
            });

            Notification.create(notification);

            ws.send(JSON.stringify({ type: 'notification' }));
          }
          res.json(device);
        })
        .catch(err => {
          res.statusMessage = 'Unable to update the database.';
          res.status(400).end();
        });
    })
    .catch( err => {
      res.statusMessage = 'Something went wrong, try again later.';
      res.status(500).end();
    });
});

devicesRouter.route('/items/:id/:setting').put((req, res) => {
  const id = req.params.id;
  const setting = req.params.setting;

  Device.findOne({ _id: id })
    .then( device => {
      const items = device.items;

      items[setting].data = req.body.value;

      device.items = items;

      device.markModified('items');

      device.save()
        .then(device => {
          res.json(device);
        })
        .catch(err => {
          res.statusMessage = 'Unable to update the database.';
          res.status(400).end();
        });
    })
    .catch( err => {
      res.statusMessage = 'Something went wrong, try again later.';
      res.status(500).end();
    });
});

module.exports = devicesRouter;
