const express = require('express');
const locationRouter = express.Router();
const Location = require('../models/location');

locationRouter.route('/').get((req, res) => {
  Location.find((err, locations) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        text: 'Something went wrong, try again later.'
      });
      return;
    }

    res.json(locations);
  });
});

locationRouter.route('/').post((req, res) => {
  const location = req.body.location;

  Location.create({ value: location, label:location },
    (err, location) => {
      if (err) {
        res.status(500).send({
          status: 'error',
          text: 'Could not add the location.'
        });
        return;
      }

      res.json(location);
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
