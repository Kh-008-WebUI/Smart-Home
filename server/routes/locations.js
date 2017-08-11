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

module.exports = locationRouter;

