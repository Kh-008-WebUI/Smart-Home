const express = require('express');
const router = express.Router();
const Device = require('../models/device.js');

router.get('/', (req, res) => {
  Device.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = router;
