'use strict';

(function () {
    var app = angular.module('app', ['ngRoute', 'app.home', 'app.blog']);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: '/src/client/app/home/homePage.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        }).when('/blog', {
            templateUrl: '/src/client/app/blog/blogList.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        });
    }]);
})();