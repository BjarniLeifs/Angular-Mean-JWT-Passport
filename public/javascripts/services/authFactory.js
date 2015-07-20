app.factory('auth', ['$http', '$window', 
    function ($http, $window) {
        var auth = {};

        auth.setToken = function (token) {
            $window.localStorage['myApp-token'] = token;
        };

        auth.getToken = function () {
            return $window.localStorage['myApp-token'];
        };

        auth.isLoggedIn = function () {
            var token = auth.getToken();

            if (!token) {
                return false;
            }

            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        };

        auth.currentUser = function () {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.username;
            }
        };

        auth.register = function (user) {
            return $http.post('/register', user)
                .success(function (data) {
                    auth.setToken(data.token);
                });
        };

        auth.logIn = function (user) {
            return $http.post('/login', user)
                .success(function (data) {
                    auth.setToken(data.token);
                });
        };

        auth.logOut = function () {
            $window.localStorage.removeItem('myApp-token');
        };

        return auth;
    }
]);