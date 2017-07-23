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

module.exports = devicesRouter;
