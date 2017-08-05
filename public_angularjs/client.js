var app = angular.module('todoApp', []);

app.controller('Login', function (auth, $scope, $http, $rootScope) {
    $scope.register = function () {
        return $http.post('http://localhost:8080/api/register', {
            username: $scope.username,
            password: $scope.password
        }).then(function (res) {
            $scope.status = "User Registered";
            $scope.info = "";
        }, function (err) {
            $scope.status = "Error Whilst Registering";
            $scope.info = err
        });
    };

    $scope.login = function () {
        return $http.post('http://localhost:8080/api/login', {
            username: $scope.username,
            password: $scope.password
        }).then(function (res) {
            $scope.status = "Logged in";
            $scope.info = "";
            auth.saveToken(res.data.token);
            $rootScope.$emit('todoListUpdated');
        }, function (err) {
            $scope.status = "Error logging in";
            $scope.info = err
        });
    };
    $scope.logout = function ($scope) {
        auth.logout && auth.logout()
    };
    $scope.isAuthed = function ($scope) {
        return auth.isAuthed ? auth.isAuthed() : false
    }
});

app.controller('Todo', function (auth, $scope, $rootScope, $http) {

    $rootScope.$on('todoListUpdated', function () {
        $http.get('http://localhost:8080/api/todo')
            .success(function (data) {
                $scope.todoList = data;
            })
            .error(function (data) {
                console.debug('Error: ' + data);
            });
    });

    $scope.getAll = function () {
        $http.get('http://localhost:8080/api/todo')
            .success(function (data) {
                $scope.todoList = data;
            })
            .error(function (data) {
                console.debug('Error: ' + data);
            });
    };

    $scope.create = function (text) {
        $http.post(' ', {'text': text})
            .success(function (data) {
                $scope.formData = null;
                $scope.info = 'Item created';
                $rootScope.$emit('todoListUpdated');
            })
            .error(function (data) {
                $scope.info = data;
            });
    };

    $scope.delete = function (todo) {
        $http.delete('http://localhost:8080/api/todo/' + todo._id)
            .success(function (data) {
                $scope.info = 'Item deleted';
                $rootScope.$emit('todoListUpdated');
            })
            .error(function (data) {
                $scope.info = data;
            });
    };

    $scope.markAsDone = function (todo) {
        todo.done = (!todo.done);
        $http.put('http://localhost:8080/api/todo/' + todo._id, todo)
            .success(function (data) {
                $scope.info = 'Item updated';
                $rootScope.$emit('todoListUpdated');
            })
            .error(function (data) {
                $scope.info = data;
            });
    };
});

app.service('auth', function ($window) {
    var self = this;

    self.getToken = function () {
        return $window.localStorage['jwtToken'];
    };

    self.saveToken = function (token) {
        $window.localStorage['jwtToken'] = token;
    };
    self.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    }
});

app.factory('authInterceptor', function (auth) {
    return {
        request: function (config) {
            var token = auth.getToken();
            if (config.url.indexOf('/api') === 0 && token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },
        response: function (res) {
            return res;
        }
    }
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
