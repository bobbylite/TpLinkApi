# TP Link LB130 REST API

RESTful API for TP Link LB100 series Smartbulbs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
node@v6.11.4
npm@3.10.10

```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
git clone https://github.com/bobby3501/TpLinkApi.git

cd TpLinkApi

npm install

npm start
```

You now have TP Link Api up and running.
You should be able to view it at http://127.0.0.1:3000/tplink/

## Running the tests

You will have to modify the following code block in routes/tpLink.js.

```javascript
router.get('/On', (req, res, next) => {
  ClientLoginControlPowerState('192.168.1.197', true); // Enter your Smartbulbs IP Address here.
  ClientLoginControlPowerState('192.168.1.191', true); // Enter your Smartbulbs IP Address here.

  res.render('index', {
    Welcome: 'Testing Login',
    title: 'Login'
  });
});
```

### Break down into end to end tests

Testing the UI requires the following link:

```
http://127.0.0.1/tplink/
```

### And coding style tests

Adding your own route to the route file.  This can be done to
create a custom REST action. 

```javascript
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
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Express-React-Views](https://github.com/reactjs/express-react-views) - The View Engine Used.
* [Express](https://expressjs.com/) - ExpressJS

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Bobby Luisi** - *Initial work* - [bobby3501](https://github.com/bobby3501)

See also the list of [contributors](https://github.com/bobby3501/tplink/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Express-React-Views - https://github.com/reactjs/express-react-views
* ExpressJS
