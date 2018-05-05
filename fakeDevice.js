const express = require('express');

const app = express();

const port = parseInt(process.argv[2]);

app.get('/cm', (req, res) => {
  const cmd = req.query.cmnd;
  if (cmd === 'Power On') {
    console.log('ON');
  }

  if (cmd === 'Power off') {
    console.log('OFF');
  }

  res.send('OK');
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Fake device is listening on 127.0.0.1:${port}`);
  }
});