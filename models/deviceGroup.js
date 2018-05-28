const Device = require('./device').deviceSchema;
const mongoose = require('mongoose');


const DeviceGroup = mongoose.model('DeviceGroup', {
  name: String,
  isOn: Boolean,
  devices: [Device]
});

module.exports = DeviceGroup;