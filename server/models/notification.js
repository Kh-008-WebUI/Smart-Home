const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  time: Date,
  text: String,
  viewed: Boolean,
  emergency: Boolean
});

module.exports = mongoose.model('Notification', notificationSchema);
