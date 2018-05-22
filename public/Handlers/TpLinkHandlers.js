const { Client } = require('tplink-smarthome-api');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

module.exports = {
  responseCreator: (status) => {
    switch(status){
      case true:
        return 'Successfully turned on the lights.'
      case false:
        return 'Successfully turned off the lights.'
      default:
        return 'Server Response: Status is not true. Status is not false.'
    }
  },
  handleLightRequest: (request) => {
    return new Promise(
      (resolve, reject) => {
        const {status, message} = request;
        DiscoveryControlLightState(status && true)
        .then(() => {
          resolve(status)
        })
        .catch((err) => {
          reject(err)
        })
      })
  },
  handlePowerRequest: (request) => {
    return new Promise(
      (resolve, reject) => {
        const {status, message} = request;
        DiscoveryControlPowerState(status && true)
        .then(() => {
          resolve(status)
        })
        .catch((err) => {
          reject(err)
        })
      })
  }
};

DiscoveryControlPowerState = (status) => {
  return new Promise(
    (resolve, reject) => {
      const client = new Client();
      client.startDiscovery()
      .on('device-new', (device) => {
        device.getSysInfo()
        .then(console.log)
        .catch((err) => reject)
        device.setPowerState(status && true)
        .then(resolve)
        .catch(reject)
      })
      .on('error', (err) => {
        reject(err)
      })
    })
};

DiscoveryControlLightState = (options) => {
  options = {
    "transition_period": 100,
    "on_off": true,
    "hue": 200,
    "saturation": 80,
    "brightness": 30,
    "color_temp": 3000//2500-9000
  }; // Try using .getLightState([sendOptions]) to see example object.
  return new Promise(
    (resolve, reject) => {
      const client = new Client();
      client.startDiscovery()
      .on('device-new', (device) => {
        device.getSysInfo()
        .then(console.log)
        .catch((err) => reject)
        device.lighting.setLightState(
          options,
          {timeout: 1000, transport: "tcp"}
        ).then(resolve)
    })
  })
};

ClientLoginControlPowerState = (ipAddress, status) => {
  const client = new Client();
  const plug = client.getDevice({host: ipAddress})
  .then((device)=>{
    device.getSysInfo()
    .then(console.log);
    device.setPowerState(status);
  });
};
