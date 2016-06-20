var path = require('path'),
    util = require('util'),
    redis = require("redis"),
    client = redis.createClient(),
    _ = require("lodash"),
    config = require(path.join(__dirname, 'config.json')),
    jsonwebtoken = require("jsonwebtoken"),
    UnauthorizedAccessError = require(path.join(__dirname, 'errors', 'UnauthorizedAccessError.js'));

module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        util.inspect(authorization);
        if (part.length === 2) {
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.create = function (user, req, res, next) {

    if (_.isEmpty(user)) {
        return next(new Error('User data cannot be empty.'));
    }
    var data = {
        _id: user._id,
        username: user.username,
        token: jsonwebtoken.sign({ _id: user._id }, config.jwt.key, {
            expiresIn: config.jwt.expiresIn
        })
    };

    var decoded = jsonwebtoken.decode(data.token);

    data.token_exp = decoded.exp;
    data.token_iat = decoded.iat;
    data.token_ip = decoded.ip;

    client.set(data.token, JSON.stringify(data), function (err, reply) {
        if (err) {
            return next(new Error(err));
        }

        if (reply) {
            client.expire(data.token, config.jwt.expiresIn * 60, function (err, reply) {
                if (err) {
                    return next(new Error("Can not set the expire value for the token key"));
                }
                if (reply) {
                    req.user = data;
                    next();
                } else {
                    return next(new Error('Expiration not set on redis'));
                }
            });
        }
        else {
            return next(new Error('Token not set in redis'));
        }
    });

    return data;

};

module.exports.retrieve = function (id, done) {

    if (_.isNull(id)) {
        return done(new Error("token_invalid"), {
            "message": "Invalid token"
        });
    }

    client.get(id, function (err, reply) {
        if (err) {
            return done(err, {
                "message": err
            });
        }

        if (_.isNull(reply)) {
            return done(new Error("token_invalid"), {
                "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
            });
        } else {
            var data = JSON.parse(reply);
            if (_.isEqual(data.token, id)) {
                return done(null, data);
            } else {
                return done(new Error("token_doesnt_exist"), {
                    "message": "Token doesn't exists, login into the system so it can generate new token."
                });
            }

        }

    });

};

module.exports.verify = function (req, res, next) {

    var token = exports.fetch(req.headers);

    jsonwebtoken.verify(token, config.jwt.key, function (err) {

        if (err) {
            req.user = undefined;
            return next(new UnauthorizedAccessError("invalid_token"));
        }

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.user = undefined;
                return next(new UnauthorizedAccessError("invalid_token", data));
            }

            req.user = data;
            next();

        });

    });
};

module.exports.expire = function (headers) {

    var token = exports.fetch(headers);

    if (token !== null) {
        client.expire(token, 0);
    }

    return token !== null;

};

module.exports.middleware = function () {

    var func = function (req, res, next) {

        var token = exports.fetch(req.headers);

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.user = undefined;
                return next(new UnauthorizedAccessError("invalid_token", data));
            } else {
                req.user = _.merge(req.user, data);
                next();
            }

        });
    };

    func.unless = require("express-unless");

    return func;

};

module.exports.TOKEN_EXPIRATION = config.jwt.expiresIn;
module.exports.TOKEN_EXPIRATION_SEC = config.jwt.expiresIn * 60;
