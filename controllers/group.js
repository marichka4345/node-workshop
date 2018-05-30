const router = require('express').Router();
const DeviceGroup = require('../models/deviceGroup');
const Device = require('../models/device').device;
const { fetchUrl } = require('fetch');

router.route('/')
.get((req, res) => {
  DeviceGroup.find((err, docs) => {
    if(err) {
      res.sendStatus(500);
      return;
    }
    
    const deviceGroups = docs.map(({ _id, name, isOn, devices }) => ({
      _id,
      name,
      isOn,
      devices
    }));

    res.json(deviceGroups);
  })
})
.post(async (req, res) => {
  const deviceGroup = req.body;

  await DeviceGroup.create({
    name: deviceGroup.name,
    isOn: false,
    devices: []
  })

  res.sendStatus(201);
});

router.route('/:id')
  .get((req, res) => {
    const id = req.params.id;

    DeviceGroup.findById(id, (err, group) => {
      res.json(group);
    });
  })
  .post(async (req, res) => {
    const isOn = req.body.isOn;
    const id = req.params.id;
  
    const group = await DeviceGroup.findById(id);
    const command = '/cm?cmnd=' + (isOn ? 'Power On' : 'Power off');
    const processDevice = async (device) => {
      const dbDevice = await Device.findById(device._id);
       
      await fetchUrl(dbDevice.address + command, () => {});
      dbDevice.isOn = isOn;
      await dbDevice.save();
    };

    const promises = group.devices.map(processDevice);
    Promise.all(promises).then(() => {
      group.isOn = isOn;
      group.save();
      res.sendStatus(200);
    });
  })
  .put(async (req, res) => {
    const deviceID = req.body.id;
    const id = req.params.id;
  
    let deviceIndex;
    const group = await DeviceGroup.findById(id);
    const groupDevice = group.devices.find((device, index) => {
      deviceIndex = index;
      return device.id === deviceID;
    });
    if (!groupDevice) {
      const device= await Device.findById(deviceID);
      group.devices = [...group.devices, device];
    } else {
      group.devices = [
        ...group.devices.slice(0, deviceIndex),
        ...group.devices.slice(deviceIndex + 1)
      ];
    }
  
    await group.save();
    res.sendStatus(200);
  });


module.exports = router;