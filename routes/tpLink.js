var express = require('express');
var router = express.Router();
const { Client } = require('tplink-smarthome-api');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

router.get('/', function(req, res, next) {
  res.render('index', {
    Welcome: 'Welcome to TP Link API by Bobby Luisi',
    title: 'TpLink API'
  });
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

router.post('/api', (req, res, next) => {
  handleRequest(req.body).then((status) => {
    if (status === true ) {
      res.json({
            status: true,
            message: 'Successfully turned on the lights.'
          });
    }
    if (status === false ) {
      res.json({
            status: false,
            message: 'Successfully turned off the lights.'
          });
    }
    else {
      res.json({
        status: 503,
        message: 'BACKEND API - Seems like the status isn\'t true or false'
      })
    }
  })
  .catch((err) => {
    status: 502
  });
});

handleRequest = (request) => {
  return new Promise(
    (resolve, reject) => {
      const {status, message} = request;
      if (status === true) DiscoveryControlPowerState(status).then(() => {
        resolve(true)
      });
      if (status === false) DiscoveryControlPowerState(status).then(() => {
        resolve(false)
      });
    });
};

ClientLoginControlPowerState = (ipAddress, status) => {
  const client = new Client();
  const plug = client.getDevice({host: ipAddress}).then((device)=>{
    device.getSysInfo().then(console.log);
    device.setPowerState(status);
  });
};

DiscoveryControlPowerState = (status) => {
  return new Promise(
    (resolve, reject) => {
      const client = new Client();
      // Look for devices, log to console, and turn them on or off
      client.startDiscovery().on('device-new', (device) => {
        device.getSysInfo().then(console.log);
        device.setPowerState(status).then(resolve);
      });
    });
};

module.exports = router;
