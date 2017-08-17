const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  value: {
    type: String,
    required: [true, 'Value is required.']
  },
  label: {
    type: String,
    required: [true, 'Label is required.']
  }
});

module.exports = mongoose.model('Location', locationSchema);
