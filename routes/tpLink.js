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
 res.redirect('https://github.com/bobby3501/TpLinkApi/blob/master/README.md');
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

router.post('/api/power', (req, res, next) => {
  handlePowerRequest(req.body).then((status) => {
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

router.post('/api/light', (req, res, next) => {
  handleLightRequest(req.body).then((status) => {
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
      });
    };
  })
  .catch((err) => {
    res.json({
      status: 502,
      message: 'BACKEND API - Seems like the status isn\'t true or false'
    });
  });
});

handlePowerRequest = (request) => {
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

handleLightRequest = (request) => {
  return new Promise(
    (resolve, reject) => {
      const {status, message} = request;
      if (status === true) DiscoveryControlLightState(status).then(() => {
        resolve(true)
      });
      if (status === false) DiscoveryControlLightState(status).then(() => {
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

DiscoveryControlLightState = (options) => {
  options = {
    transition_period: 100,
    on_off: true,
    hue: 200,
    saturation: 80,
    brightness: 30,
    color_temp: 3000//2500-9000
  }
  return new Promise(
    (resolve, reject) => {
      const client = new Client();
      // Look for devices, log to console, and turn them on or off
      client.startDiscovery().on('device-new', (device) => {
        device.getSysInfo().then(console.log);
        device.lighting.setLightState(options, {timeout: 1000, transport: "tcp"}).then(resolve);
    });
  });
};

module.exports = router;
