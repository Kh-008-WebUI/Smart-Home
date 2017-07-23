const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationsSchema = new Schema({
  time: String,
  text: String,
  viewed: Boolean
});

module.exports = mongoose.model('Notification', notificationsSchema);
