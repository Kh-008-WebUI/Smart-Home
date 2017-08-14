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

  Location.findOneAndRemove({ _id: id }, (err, id)
  .then(
    res.json(id);
    Device.find({ "location._id": id }, (err, device)
      .then( device => {        
        res.status(500).end();
        return;
      )};
    )
    .catch (err) {
      res.json(id);
      res.statusMessage = 'Something went wrong, could not delete the device.';
      res.status(500).end();
      return;
    }
  });
});

module.exports = locationRouter;
