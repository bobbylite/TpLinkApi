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

router.get('/Login', (req, res, next) => {

  const client = new Client();
  const plug = client.getDevice({host: '192.168.1.197'}).then((device)=>{
    device.getSysInfo().then(console.log);
    device.setPowerState(true);
  });

  // Look for devices, log to console, and turn them on
  client.startDiscovery().on('device-new', (device) => {
    device.getSysInfo().then(console.log);
    device.setPowerState(true);
  });
  
  res.render('index', {
    Welcome: 'Testing Login',
    title: 'Login'
  });
})

module.exports = router;
