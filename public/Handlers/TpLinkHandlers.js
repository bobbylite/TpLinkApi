const { Client } = require('tplink-smarthome-api');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

module.exports = {
  handlePowerRequest: (request) => {
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
  },
  handleLightRequest: (request) => {
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
  }
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
