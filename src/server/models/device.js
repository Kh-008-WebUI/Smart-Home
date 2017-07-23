const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const devicesSchema = new Schema({
  id: Number,
  name: String,
  items: { type : Array , 'default' : [] },
  status: Boolean,
  location: String
});

module.exports = mongoose.model('Device', devicesSchema);