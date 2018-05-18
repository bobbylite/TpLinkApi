var express = require('express');
var router = express.Router();
const { Client } = require('tplink-smarthome-api');


router.get('/', function(req, res, next) {
  res.render('index', {
    Welcome: 'Welcome to TP Link API by Bobby Luisi',
    title: 'TpLink API'
  });
});

router.get('/test', (req, res, next) => {
  console.log('Hello World');
});

router.get('/On', (req, res, next) => {
  ClientLoginControlPowerState('192.168.1.197', true);
  ClientLoginControlPowerState('192.168.1.191', true);

  res.render('index', {
    Welcome: 'Testing Login',
    title: 'Login'
  });
})

router.get('/Off', (req, res, next) => {
  DiscoveryControlPowerState(false);

  res.render('index', {
    Welcome: 'Testing Login',
    title: 'Login'
  });
});

ClientLoginControlPowerState = (ipAddress, status) => {
  const client = new Client();
  const plug = client.getDevice({host: ipAddress}).then((device)=>{
    device.getSysInfo().then(console.log);
    device.setPowerState(status);
  });
};

DiscoveryControlPowerState = (status) => {
  const client = new Client();
  // Look for devices, log to console, and turn them on
  client.startDiscovery().on('device-new', (device) => {
    device.getSysInfo().then(console.log);
    device.setPowerState(status);
  });
};

module.exports = router;
