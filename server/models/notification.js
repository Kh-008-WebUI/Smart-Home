const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getCurrentTime = require('../utils/getCurrentTime');
const notificationSchema = new Schema({
  time: { type: String, default: getCurrentTime },
  text: String,
  viewed: Boolean,
  emergency: Boolean
});

module.exports = mongoose.model('Notification', notificationSchema);
