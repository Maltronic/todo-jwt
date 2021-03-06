var path = require('path'),
    _ = require('lodash'),
    util = require('util'),
    auth = require(path.join(__dirname, 'auth.js')),
    Router = require('express').Router,
    UnauthorizedAccessError = require(path.join(__dirname, 'errors', 'UnauthorizedAccessError.js')),
    NotFoundError = require(path.join(__dirname, 'errors', 'NotFoundError.js')),
    User = require(path.join(__dirname, 'models', 'user.js')),
    TodoItem = require(path.join(__dirname, 'models', 'todoItem.js')),
    jwt = require('express-jwt');

module.exports = function () {

    var router = new Router();

    router.route('/register').post(function (req, res) {
        var data = {
            username: req.body.username,
            password: req.body.password
        };
        User.create(data, function (err, user) {
            if (err) {
                res.status(400);
                res.send('Could not create user');
                return;
            }

            User.findOne({_id: user._id}, function (err, user) {
                if (err) {
                    res.status(400);
                    res.send('Could not create user');
                    return;
                }

                res.json(user);
            });
        });
    });

    router.route('/verify').get(function (req, res, next) {
        return res.status(200).json(undefined);
    });

    router.route('/logout').get(function (req, res, next) {
        if (auth.expire(req.headers)) {
            delete req.user;
            return res.status(200).json({
                'message': 'User has been successfully logged out'
            });
        } else {
            return next(new UnauthorizedAccessError('401'));
        }
    });

    router.route('/login').post(authenticate, function (req, res, next) {
        return res.status(200).json(req.user);
    });

    // Fetch List
    router.route('/todo').get(function (req, res) {
        TodoItem.find(function (err, todoList) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(todoList);
        });

    });

    // Fetch Item
    router.route('/todo/:_id').get(function (req, res) {
        TodoItem.findOne({_id: req.params._id}, function (err, todo) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(todo);
        });

    });

    // Create Item
    router.route('/todo').post(function (req, res) {
            TodoItem.create({
                text: req.body.text,
                done: (util.isBoolean(req.body.done)) ? (req.body.done) : false,
                createdAt: new Date().toISOString(),
                priority: (util.isNumber(req.body.priority)) ? req.body.priority : 0
            }, function (err, todo) {
                if (err) {
                    res.status(400);
                    res.send('Could not create todo item');
                    return;
                }

                TodoItem.findOne({_id: todo._id}, function (err, todo) {
                    if (err) {
                        res.status(400);
                        res.send('Could not create todo item');
                        return;
                    }

                    res.json(todo);
                });
            });
        }
    );

    // Update Item
    router.route('/todo/:_id').put(function (req, res) {
        const test = TodoItem.findOne({_id: req.params._id}, function (err, todo) {
            if (err) {
                res.send(err);
            }

            if (_.isEmpty(todo)) {
                res.send(new NotFoundError('404'));
                return;
            }

            if (todo.id !== req.params._id) {
                res.send(new Error('400'));
                return;
            }

            TodoItem.update({_id: req.params._id}, req.body, {new: true}, function (err) {
                if (err) {
                    res.send(err);
                }
            });
            todo = req.body;
            res.json(todo);
        });
    });

    // Delete Item
    router.route('/todo/:_id').delete(function (req, res) {
        TodoItem.remove({
            _id: req.params._id
        }, function (err, todo) {
            if (err) {
                res.send(err);
                return;
            }

            res.json({'deleted': true});
        })
    });

    router.unless = require('express-unless');

    return router;
};

var authenticate = function (req, res, next) {

    var username = req.body.username,
        password = req.body.password;

    if (_.isEmpty(username) || _.isEmpty(password)) {
        return next(new UnauthorizedAccessError('401', {
            message: 'Credentials Failed'
        }));
    }

    process.nextTick(function () {

        User.findOne({
            username: username
        }, function (err, user) {
            if (err || !user) {
                return next(new UnauthorizedAccessError('401', {
                    message: 'Credentials Failed'
                }));
            }
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                    auth.create(user, req, res, next);
                } else {
                    return next(new UnauthorizedAccessError('401', {
                        message: 'Credentials Failed'
                    }));
                }
            });
        });

    });
};
