'use strict';

var path = require('path'),
    config = require(path.join(__dirname, 'config.json')),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    jwt = require('express-jwt'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    NotFoundError = require(path.join(__dirname, 'errors', 'NotFoundError.js')),
    util = require('util'),
    auth = require(path.join(__dirname, 'auth.js')),
    unless = require('express-unless'),
    cors = require('cors');

mongoose.connect('mongodb://' + config.db.host);

app.use(cors())
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/json'}));
app.use(methodOverride());

var jwtCheck = jwt({
    secret: config.jwt.key
});
app.use(auth.middleware(jwtCheck).unless(
    {
        path: [
            '/api/login',
            '/api/register',

            //Front End
            '/index.html',
            '/client.js',
            '/favicon.ico'
        ]
    }
));
app.use('/api', require(path.join(__dirname, 'routes.js'))());
app.use('/', express.static('public'));

app.all('*', function (req, res, next) {
    return res.send(new NotFoundError('404'));
});

app.use(function (err, req, res) {
    var code = 500,
        msg = {message: 'Internal Server Error'};

    switch (err.name) {
        case 'UnauthorizedError':
            code = err.status;
            msg = undefined;
            break;
        case 'BadRequestError':
        case 'UnauthorizedAccessError':
        case 'NotFoundError':
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }

    return res.status(code).json(msg);

});

app.listen(config.port);
console.log('App running on port ' + config.port);
