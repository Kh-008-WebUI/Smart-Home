const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  name: String,
  home: Boolean
});

module.exports = mongoose.model('User', usersSchema);
