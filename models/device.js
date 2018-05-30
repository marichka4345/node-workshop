const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: String,
  address: String,
  isOn: Boolean,
  groups: [String]
});
const Device = mongoose.model('Device', DeviceSchema);

module.exports = {
  device: Device,
  deviceSchema: DeviceSchema
};