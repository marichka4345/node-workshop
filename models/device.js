const mongoose = require('mongoose');

const Device = mongoose.model('Device', {
  name: String,
  address: String,
  isOn: Boolean
});

module.exports = Device;