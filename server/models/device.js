const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  createdDate: String,
  createdBy: String,
  updetedDate: String,
  name: {
    type: String,
    required: [true, 'You forgot to give a name for device.'],
    minlength: [3, 'Name of your device is too short.'],
    maxlength: 18
  },
  location: {
    type: String,
    required: [true, 'Location is required.'],
    enum: ['living room', 'hallway', 'kitchen', 'bedroom']
  },
  status: {
    type: Boolean,
    required: [true, 'Status is required.'],
    validate: [booleanValidator, 'Field must be boolean']
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  items: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Device', deviceSchema);

function booleanValidator(value) {
  return (value === true || value === 'true' || value === false || value === 'false');
};

function dateValidator(value) {
  return (value <= Date.now());
}
