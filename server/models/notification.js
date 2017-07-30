const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getCurrentTime = require('../utils/getCurrentTime');
const notificationSchema = new Schema({
  time: String,
  text: String,
  viewed: { type: Boolean, default: false },
  emergency: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
