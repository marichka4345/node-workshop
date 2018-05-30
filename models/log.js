const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceLogSchema = new Schema({
  timestamp: Date,
  message: String,
  level: String
}, {collection: 'logs'});
const DeviceLog = mongoose.model('DeviceLog', DeviceLogSchema);

module.exports = DeviceLog;