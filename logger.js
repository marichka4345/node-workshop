const winston = require('winston');
require('winston-mongodb');

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.MongoDB({
      level: 'info',
      json: false,
      db : 'mongodb://localhost/node-workshop',
      collection: 'logs',
      timestamp: tsFormat
    })
  ],
  exitOnError: false
});

module.exports = logger;