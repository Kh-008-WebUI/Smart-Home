const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: String,
  home: Boolean
});

module.exports = mongoose.model('User', userModel);
