const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  value: {
    type: String
  },
  label: {
    type: String
  }
});

module.exports = mongoose.model('Location', locationSchema);
