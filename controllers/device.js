const router = require('express').Router();
const Device = require('../models/device');
const fetchUrl = require('fetch').fetchUrl;

let counter = 2;

router.route('/')
.get((req, res) => {
  Device.find((err, docs) => {
    if(err) {
      res.sendStatus(500);
      return;
    }
    
    const devices = docs.map(doc => ({
      id: doc._id,
      name: doc.name,
      address: doc.address,
      isOn: doc.isOn
    }));

    res.json(devices);
  })
})
.post(async (req, res) => {
  const device = req.body;

  await Device.create({
    name: device.nameValue,
    address: device.ipValue,
    isOn: false
  })

  res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
  try {
    await Device.findByIdAndRemove(req.params.id).exec();
    res.sendStatus(201);
  } catch(e) {
    res.sendStatus(500);
  }
});

router.post('/:id', async (req, res) => {
  const isOn = req.body.isOn;
  const id = req.params.id;

  const device = await Device.findById(id);
  const command = '/cm?cmnd=' + (isOn ? 'Power On' : 'Power off');

  fetchUrl(device.address + command, async (err, meta, body) => {
    device.isOn = isOn;
    await device.save();

    res.sendStatus(200);
  });
})

module.exports = router;