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

devicesRouter.route('/').post((req, res) => {

  console.log(req.body);

  Device.create(req.body, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(device);
    }
  })
})

devicesRouter.route('/device/:id').get((req, res) => {
  const id = req.params.id;

  Device.findOne({_id:id}, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(device);
    }
  });
})

devicesRouter.route('/:id').delete((req, res) => {
  const id = req.params.id;

  Device.findOneAndRemove({_id:id}, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(id);
    }
  })
})

devicesRouter.route('/:id').put((req, res) => {
  const id = req.params.id;

  Device.findOne({_id:id}, (err, device) => {
    if(err) {
      console.log(err);
    }
    else{
      for(var prop in req.body) {
        device[prop] = req.body[prop];req
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
