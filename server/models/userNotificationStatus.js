const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userNotificationStatusSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notificationID: {
    type: Schema.Types.ObjectId,
    ref: 'Notification'
  },
  statusViewed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserNotificationStatus',
 userNotificationStatusSchema);
