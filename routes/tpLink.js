var express = require('express');
var router = express.Router();
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var tplinkHandler = require('../public/Handlers/tplinkHandlers');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

router.get('/', function(req, res, next) {
 res.redirect('https://github.com/bobby3501/TpLinkApi/blob/master/README.md');
});

router.post('/api/power', (req, res, next) => {
  tplinkHandler.handlePowerRequest(req.body)
  .then((status) => {
    res.json({
      status: status && true,
      message: tplinkHandler.responseCreator(status && true)
    })
  })
  .catch((err) => {
    res.json({
      status: 500,
      message: err.message
    });
  });
});

router.post('/api/light', (req, res, next) => {
  tplinkHandler.handleLightRequest(req.body)
  .then((status) => {
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
        status: 520,
        message: 'BACKEND API - Seems like the status isn\'t true or false'
      });
    };
  })
  .catch((err) => {
    res.json({
      status: 500,
      message: 'Server Error.'
    });
  });
});

module.exports = router;
