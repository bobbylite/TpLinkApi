# TP Link LB130 REST API

RESTful API for TP Link LB100 series Smartbulbs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To install the project, you need to have the following versions of node and npm installed:

```
node@v6.11.4
npm@3.10.10

```

### Installing

Enter the following commands in order to get the development environment running

```
git clone https://github.com/bobby3501/TpLinkApi.git

cd TpLinkApi

npm install

npm start
```

You should now have TP Link REST API up and running,
and should be able to view it at http://127.0.0.1:3001/tplink/

## Running the tests

Now, modify the following code block in routes/tpLink.js

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
http://127.0.0.1:3001/
```

### Custom code

Adding RESTful Action
To add your own custom REST action:

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
The following command will start the API Sever and the React UI.
```
sudo npm start
```

## Built With

* [Express-React-Views](https://github.com/reactjs/express-react-views) - The View Engine Used.
* [Ant.Design](http://ant.design/) - Ant.Design

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Bobby Luisi** - *Initial work* - [bobby3501](https://github.com/bobby3501)

See also the list of [contributors](https://github.com/bobby3501/tplink/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* TPLINK Client API - https://www.npmjs.com/package/tplink-smarthome-api#new_Client_new
