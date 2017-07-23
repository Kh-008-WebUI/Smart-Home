const express = require('express');
const deviceRouter = express.Router();
const Device = require('../models/device.js');

deviceRouter.get('/', (req, res) => {
  Device.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = deviceRouter;
