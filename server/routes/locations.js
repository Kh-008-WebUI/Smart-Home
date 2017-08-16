const express = require('express');
const locationRouter = express.Router();
const Location = require('../models/location');
const Device = require('../models/device');

locationRouter.route('/').get((req, res) => {
  Location.find()
    .then( locations => {
      res.json(locations);
    })
    .catch( err => {
      res.statusMessage = 'Something went wrong, try again later.';
      res.status(500).end();
    });
});

locationRouter.route('/').post((req, res) => {
  const location = req.body.location;

  Location.create({value: location.toLowerCase(), label:location})
    .then( location => {
      res.json(location);
    })
    .catch( err => {
      res.statusMessage = 'Something went wrong, try again later.';
      res.status(500).end();
    });
});

locationRouter.route('/:id').delete((req, res) => {
  const id = req.params.id;

  Location.findOne({ _id: id })
    .then(location => {
      Device.find({ location: location.value })
        .then(devices => {
          if(devices.length > 0){
            res.statusMessage = 'Something went wrong, could not delete the location';
            res.status(500).end();
            return;
          }
          Location.findOneAndRemove({ _id: id })
            .then(location => {
              res.json(id);
            });
        });
    })
    .catch (err => {
      res.status(500).end();
    });
});

locationRouter.route('/devices/:id').get((req, res) => {
  const id = req.params.id;

  Location.findOne({ _id: id })
    .then(location => {
      Device.find({ location: location.label })
        .then(devices => {
          if(devices.length > 0){
            res.json({ deviceInLocation: true });
          } else {
            res.json({ deviceInLocation: false });
          }
        })
        .catch (err => {
          res.status(500).end();
        });
    })
    .catch (err => {
        res.status(500).end();
      });
});

module.exports = locationRouter;
