const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  time: {
    type: Date,
    required: true,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  },
  viewed: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
