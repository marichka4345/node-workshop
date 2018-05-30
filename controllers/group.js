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
    });

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
      try {
        const dbDevice = await Device.findById(device._id);

        await fetchUrl(dbDevice.address + command, () => {
        });
        dbDevice.isOn = isOn;
        await dbDevice.save();
      } catch (e) {
        res.sendStatus(500);
      }
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
    const device= await Device.findById(deviceID);
    if (!groupDevice) {
      group.devices = [...group.devices, device];
      device.groups.push(id);
    } else {
      group.devices = [
        ...group.devices.slice(0, deviceIndex),
        ...group.devices.slice(deviceIndex + 1)
      ];
      const groupIndex = device.groups.indexOf(id);
      device.groups = [
        ...device.groups.slice(0, groupIndex),
        ...device.groups.slice(groupIndex + 1)
      ];
    }

    await device.save();
    await group.save();
    res.sendStatus(200);
  })
  .delete(async (req, res) => {
    try {
      await DeviceGroup.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(201);
    } catch(e) {
      res.sendStatus(500);
    }
  });


module.exports = router;