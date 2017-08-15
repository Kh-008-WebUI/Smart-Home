const express = require('express');
const locationRouter = express.Router();
const Location = require('../models/location');

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
