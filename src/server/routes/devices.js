const express = require('express');
const app = express();
const devicesRouter = express.Router();

let Device = require('../models/device');

devicesRouter.route('/').get((req, res) => {
  Device.find((err, devices) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(devices);
    }
  });
});

devicesRouter.route('/device/:id').get((req, res) => {
  const id = req.params.id;

  Device.findOne({id:id}, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(device);
    }
  });
})

devicesRouter.route('/delete/:id').get((req, res) => {
  const id = req.params.id;
  Device.findOneAndRemove({id:id}, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      res.send(id);
    }
  })
})

devicesRouter.route('/update/:id').post((req, res) => {
  const id = req.params.id;
  Device.findOne({id:id}, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      for(var prop in req.body) {
        device[prop] = req.body[prop];
      }
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
