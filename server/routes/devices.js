const express = require('express');
const devicesRouter = express.Router();
const Device = require('../models/device');

devicesRouter.route('/').get((req, res) => {
  Device.find((err, devices) => {
    if(err) {
      res.status(500).send({
        status: "error",
        text: "Something went wrong, try again later."
      });
    }
    else{
      res.json(devices);
    }
  }).sort({views: -1});
});

devicesRouter.route('/').post((req, res) => {
  Device.create(req.body, (err, device) => {
    if(err) {
      res.status(500).send({
        status: "error",
        text: "Could not add the device."
      });
    }
    else{
      res.json(device);
    }
  })
})

devicesRouter.route('/device/:id').get((req, res) => {
  const id = req.params.id;

  Device.findOneAndUpdate({_id:id}, {$inc:{views: 1}}, {new: true}, (err, device) => {
    if (err) {
      res.status(500).send({
        status: "error",
        text: "Something went wrong, try again later."
      });
    } else if (!device) {
      res.status(404).send({
        status: "error",
        text: "Not found."
      });
    } else {
      res.json(device);
    }
  });
})

devicesRouter.route('/:id').delete((req, res) => {
  const id = req.params.id;

  Device.findOneAndRemove({_id:id}, (err, device) => {
    if(err) {
      res.status(500).send({
        status: "error",
        text: "Something went wrong, could not delete the device."
      });
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
      res.status(500).send({
        status: "error",
        text: "Something went wrong, try again later."
      });
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
        res.status(400).send({
          status: "error",
          text: "unable to update the database"
        });
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
