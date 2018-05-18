# TP Link LB130 REST API

RESTful API for TP Link LB100 series Smartbulbs. This also includes
a React/Babel config with Express utilizing the react view engine.
React Views: https://github.com/reactjs/express-react-views

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
git cd TpLinkApi
npm install
npm start
```

You now have TP Link Api up and running.
You should be able to view it at http://127.0.0.1:3000/tplink/

## Running the tests

You will have to modify the following code block in routes/tpLink.js

``
router.get('/On', (req, res, next) => {
  ClientLoginControlPowerState('192.168.1.197', true); // Enter your Smartbulbs IP Address here.
  ClientLoginControlPowerState('192.168.1.191', true); // Enter your Smartbulbs IP Address here.

  res.render('index', {
    Welcome: 'Testing Login',
    title: 'Login'
  });
});
``

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc