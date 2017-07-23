const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const devicesSchema = new Schema({
  id: Number,
  name: String,
  items: [
    {
      id: Number,
      name: String,
      type: String,
      data: String,
      description: String
    }
  ],
  status: Boolean,
  location: String
});

module.exports = mongoose.model('Device', devicesSchema);