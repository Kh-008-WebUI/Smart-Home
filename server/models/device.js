const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  id: Number,
  name: {
    type: String,
    validate: {
      validator: (v) => {
        return (typeof v === 'String').test(v);
      },
      message: 'The name must be a string.'
    },
    required: [true, 'You forgot to give a name for device.'],
    min: [3, 'Name of yor device is too short.'],
    max: 18
  },
  location: {
    type: String,
    validate: {
      validator: (v) => {
        return (typeof v === 'String').test(v);
      },
      message: 'The Location must be a string.'
    },
    required: [true, 'Location is required.']
  },
  status: {
    type: Boolean,
    validate: {
      validator: (v) => {
        return (typeof v === 'Boolean').test(v);
      },
      message: 'The status must be a boolean.'
    },
    required: [true, 'Status is required.']
  },
  views: {
    type: Number,
    validate: {
      validator: (v) => {
        return (typeof v === 'Number').test(v);
      },
      message: 'The views must be a number.'
    },
    default: 0
  },
  items: {
    type: Array,
    validate: {
      validator: (v) => {
        return (typeof v === 'Array').test(v);
      },
      message: 'The items must be an array.'
    },
    default: []
  }
});

module.exports = mongoose.model('Device', deviceSchema);
