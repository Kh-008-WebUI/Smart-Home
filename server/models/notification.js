const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  time: String,
  text: String,
  viewed: Boolean
});

module.exports = mongoose.model('Notification', notificationSchema);
