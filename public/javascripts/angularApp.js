/* Angular routing and app declaration */

var app = angular.module('myApp', ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
            resolve: {
                postPromise: ['posts', function (posts) {
                    return posts.getAll();
                }]
            }
        })

        .state('home.list', {
            url: '/list',
            templateUrl: 'views/partial-home-list.html',
            controller: function($scope) {
                $scope.nomnoms = ['Food 1', 'Food 2', 'Food 3'];
            }
        })

        .state('fokk', {
            url: '/fokk',
            templateUrl: 'views/partial-fokk.html'
        })

        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl',
            resolve: {
                post: ['$stateParams', 'posts', function ($stateParams, posts) {
                    return posts.get($stateParams.id);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/partial-login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function ($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        })
        /*
        .state('login', {
            url: '/login',
            templateUrl: '/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function ($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        })
*/
        .state('register', {
            url: '/register',
            templateUrl: 'views/partial-register.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function ($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        });
        $urlRouterProvider.otherwise('home');
    }]);
