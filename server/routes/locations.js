const express = require('express');
const locationRouter = express.Router();
const Location = require('../models/location');

locationRouter.route('/').get((req, res) => {
  Location.find()
    .then( locations => {
      res.json(locations);
    })
    .catch( err => {
      res.status(500).send({
        status: 'error',
        text: 'Something went wrong, try again later.'
      });
    });
});

locationRouter.route('/').post((req, res) => {
  const location = req.body.location;

  Location.create({value: location.toLowerCase(), label:location})
    .then( location => {
      res.json(location);
    })
    .catch( err => {
      res.status(500).send({
        status: 'error',
        text: 'Could not add the location.'
      });
    });
});

locationRouter.route('/:id').delete((req, res) => {
  const id = req.params.id;

  Device.find({ localion._id: id }, (err, location) =>
    if(location) {
        res.statusMessage = "You have devices in this location, you can't delete
        this location";
        return;
    }
  Location.findOneAndRemove({ _id: id }, (err, location) => {
    if (err) {
      res.statusMessage = 'Something went wrong, could not delete the device.';
      res.status(500).end();
      return;
    }

    res.json(id);
  });
});

module.exports = locationRouter;
