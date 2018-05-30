const router = require('express').Router();
const DeviceLog = require('../models/log');

router.route('/')
.get((req, res) => {
  DeviceLog.find((err, docs) => {
    if(err) {
      res.sendStatus(500);
      return;
    }
    
    const logs = docs.map(({ message, timestamp }) => ({
      message,
      timestamp
    }));
    
    res.json(logs);
  })
});

module.exports = router;