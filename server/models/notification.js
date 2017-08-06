const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  time: {
    type: Date,
    default: Date.now,
    validate: [dateValidator, 'Date must be in past']
  },
  text: {
    type: String,
    required: true,
    validate: [stringValidator, 'Field must be string']
  },
  viewed: {
    type: Boolean,
    required: true,
    default: false,
    validate: [booleanValidator, 'Field must be boolean']
  },
  emergency: {
    type: Boolean,
    default: false,
    validate: [booleanValidator, 'Field must be stribooleanng']
  }
});

module.exports = mongoose.model('Notification', notificationSchema);


function booleanValidator(value) {
  console.log('validation fired on ', value);
  return (value === true || value === 'true' || value === false || value === 'false');
};

function stringValidator(value) {
  console.log('string validation fired on', value);
  return (typeof value === 'string' && isNaN(value)) ;
}

function dateValidator(value) {
  console.log('date validation fired on', value);
  return (value <= Date.now());
}