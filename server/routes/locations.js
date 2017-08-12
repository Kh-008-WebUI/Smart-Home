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
console.log(req.body);
  Location.create({value: location, label:location}, (err, location) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        text: 'Could not add the location.'
      });
    } else {
      res.json(location);
    }
  });
});

module.exports = locationRouter;
