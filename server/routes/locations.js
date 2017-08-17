const express = require('express');
const locationRouter = express.Router();
const Location = require('../models/location');
const Device = require('../models/device');
const HttpError = require('../errors/HttpError');

locationRouter.route('/').get((req, res, next) => {
  Location.find()
    .then( locations => {
      res.json(locations);
    })
    .catch( err => (next(new HttpError(404))));
});

locationRouter.route('/').post((req, res, next) => {
  const location = req.body.location;

  Location.create({value: location.toLowerCase(), label:location})
    .then( location => {
      res.json(location);
    })
    .catch( err => (next(new HttpError(501))));
});

locationRouter.route('/:id').delete((req, res, next) => {
  const id = req.params.id;

  Location.findOne({ _id: id })
    .then(location => {
      Device.find({ location: location.value })
        .then(devices => {
          if(devices.length > 0){
            next(new HttpError(501));
          }
          Location.findOneAndRemove({ _id: id })
            .then(location => {
              res.json(id);
            });
        });
    })
    .catch (err => (next(new HttpError(501))));
});

locationRouter.route('/devices/:id').get((req, res, next) => {
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
        .catch (err => (next(new HttpError(404))));
    })
    .catch (err => (next(new HttpError(400))));
});

module.exports = locationRouter;
