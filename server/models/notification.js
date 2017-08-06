const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  time: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    validate: {
      validator: (v) => {
        return (typeof v === 'String').test(v);
      },
      message: 'The text must be a string.'
    },
    required: true
  },
  viewed: {
    type: Boolean,
    required: true,
    default: false
  },
  emergency: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Notification', notificationSchema);

// notificationSchema.pre('save', function() {
//   if(typeof this.text === 'String') {
//     next(new Error('text is invalid'));
//     return;
//   }

//   next();
// });
