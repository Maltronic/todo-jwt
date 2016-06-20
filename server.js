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
    unless = require('express-unless');

mongoose.connect('mongodb://' + config.db.host);

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/json'}));
app.use(methodOverride());

var jwtCheck = jwt({
    secret: config.jwt.key
});
jwtCheck.unless = unless;

app.use(jwtCheck.unless({path: ['/public/index.html', '/public/client.js', '/api/login', '/api/register']}));
app.use(auth.middleware().unless({path: ['/public/index.html', '/public/client.js', '/api/login', '/api/register']}));
app.use('/api', require(path.join(__dirname, 'routes.js'))());
app.use('/public', express.static('public'));

app.all('*', function (req, res, next) {
    next(new NotFoundError('404'));
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
