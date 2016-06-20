(function () {

    function authService($window) {
        var self = this;

        self.getToken = function() {
            return $window.localStorage['jwtToken'];
        };

        self.saveToken = function(token) {
            $window.localStorage['jwtToken'] = token;
        };
        self.parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }
    }

    function userService($http, auth, $timeout) {
        var self = this;

        self.register = function(username, password) {
            return $http.post('http://localhost:8080/api/register', {
                username: username,
                password: password
            })
        };

        self.login = function(username, password) {
            return $http.post('http://localhost:8080/api/login', {
                username: username,
                password: password
            })
        };

        self.getAll = function ($scope) {
            $http.get('/api/todo')
                .success(function (data) {
                    console.log(data);
                    $scope.todoList = data;
                    return data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }

        self.getTodo = function ($scope) {
            $http.get('/api/todo/' + $scope.id)
                .success(function (data) {
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }

        self.create = function ($scope) {
            $http.post('/api/todo', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    console.log(data);
                    $timeout(function () {
                        $('#refesh').triggerHandler('click');
                    });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        self.delete = function ($scope) {
            $http.delete('/api/todo/' + $scope.id)
                .success(function (data) {
                    $scope.todo = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        self.markAsDone = function($scope) {
            $http.put('/api/todo/' + $scope.id, $scope)
                .success(function (data) {
                    $('#status').text("Item updated");
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    }

    function loginController(user, auth, $scope) {
        var self = this;

        function handleRequest(res, $scope) {
            var token = res.data ? res.data.token : null;
            if (token) {
                $('#status').text("Logged In");
                auth.saveToken(res.data.token);
            }
        }

        self.login = function () {
            user.login(self.username, self.password)
                .then(handleRequest, handleRequest);

        };
        self.register = function () {
            user.register(self.username, self.password)
                .then(handleRequest, handleRequest);
            $('#status').text("Registered");
        };
        self.logout = function() {
            auth.logout && auth.logout()
        }
        self.isAuthed = function () {
            return auth.isAuthed ? auth.isAuthed() : false
        }

    }

    function todoController(user, auth, $scope) {
        var self = this;
        $scope.init = function (todo) {
            console.log(todo);
        };

        self.getAll = function() {
            user.getAll($scope);
        }

        self.create = function() {
            user.create($scope);
        }

        self.markAsDone = function() {
            user.markAsDone( event.currentTarget.id);
        }

        $scope.checkItems = function () {
            var i;
        };
    }

    function authInterceptor(auth) {
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
    }

    angular.module('app', [])
        .factory('authInterceptor', authInterceptor)
        .service('user', userService)
        .service('auth', authService)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        })
        .controller('loginController', loginController)
        .controller('todoController', todoController)
})
();
