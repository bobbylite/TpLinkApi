var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var react = require('./routes/index');
var tpLinkLanding = require('./routes/tpLink');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//app.get('/', require('./routes').index);
//app.use('/', require('./routes').index);
app.use('/', react);
app.use('/tpLink', tpLinkLanding)

module.exports = app;
