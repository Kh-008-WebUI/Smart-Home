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

  Location.create({value: location, label:location})
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

module.exports = locationRouter;
