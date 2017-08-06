const express = require('express');
const devicesRouter = express.Router();
const Device = require('../models/device');
const ws = require('../index');
const moment = require('moment');

devicesRouter.route('/').get((req, res) => {
  Device.find((err, devices) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        text: 'Something went wrong, try again later.'
      });
    } else {
        res.json(devices);
    }
  }).sort({ views: -1 });
});

devicesRouter.route('/').post((req, res) => {
  const device = req.body;

  device.status = true;
  device.createdDate = moment().format('LL');
  device.createdBy = req.session.user;

  Device.create(device, (err, device) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        text: 'Could not add the device.'
      });
    } else {
      ws.send(JSON.stringify({ type: 'CREATE_DEVICE', deviceName: device.name }));
      res.json(device);
    }
  });
});

devicesRouter.route('/device/:id').get((req, res) => {
  const id = req.params.id;

  Device.findOneAndUpdate({ _id: id },
    { $inc: { views: 1 } }, { new: true }, (err, device) => {
      if (err) {
        res.statusMessage = "Something went wrong, try again later.";
        res.status(500).end();
      }
      if (!device) {
        res.statusMessage = "Not found";
        res.status(404).end();
      } else {
        res.json(device);
      }
    });
});

devicesRouter.route('/:id').delete((req, res) => {
  const id = req.params.id;

  Device.findOneAndRemove({ _id: id }, (err, device) => {
    if (err) {
      res.statusMessage = "Something went wrong, could not delete the device.";
      res.status(500).end();
    } else {
      ws.send(JSON.stringify({ type: 'DELETE_DEVICE', deviceName: device.name }));
      res.json(id);

    }
  });
});

devicesRouter.route('/:id').put((req, res) => {
  const id = req.params.id;

  Device.findOne({ _id: id }, (err, device) => {
    if (err) {
      res.statusMessage = "Something went wrong, try again later.";
      res.status(500).end();
    }
    else {
      for (let prop in req.body) {
       device[prop] = req.body[prop];
      }
      if (Object.keys(req.body).length > 1) {
        device.updetedDate = moment().format('LL');
      }
      device.save()
        .then(device => {
          if (Object.keys(req.body).length  === 1) {
            ws.send(JSON.stringify({ type: 'STATUS_DEVICE', deviceName: device.name, deviceStatus: device.status }));
          }
          res.json(device);
        })
        .catch(err => {
          res.statusMessage = "Unable to update the database.";
          res.status(400).end();
        });
    }
  });
});

devicesRouter.route('/items/:id/:setting').put((req, res) => {
  const id = req.params.id;
  const setting = req.params.setting;

  Device.findOne({ _id: id }, (err, device) => {
    if (err) {
      console.log(err);
    } else {
      const items = device.items;

      items[setting].data = req.body.value;

      device.items = items;

      device.markModified('items');

      device.save()
        .then(device => {
          res.json(device);
        })
        .catch(err => {
          res.statusMessage = "Unable to update the database.";
          res.status(400).end();
        });
    }
  });
});

devicesRouter.route('/items/:id/:setting').put((req, res) => {
  const id = req.params.id;
  const setting = req.params.setting;

  Device.findOne({ _id:id }, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      let items = device.items;
      items[setting].data = req.body.value;

      device.items = items;

      device.markModified('items');

      device.save()
        .then(device => {
          res.json(device);
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
    }
  });
});


module.exports = devicesRouter;
