'use strict';

(function () {
    var app = angular.module('app', ['ngRoute', 'app.home', 'app.blog', 'app.services']);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/about', {
            templateUrl: '/src/client/app/home/homePage.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        }).when('/', {
            templateUrl: '/src/client/app/blog/blogList.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/post/:postId', {
            templateUrl: '/src/client/app/blog/post.html',
            controller: 'PostController',
            controllerAs: 'vm'
        });
    }]);
})();