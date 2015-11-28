/**
 * Created by matt on 4/8/15.
 */
(function(){
    var app = angular.module('app', ['ngRoute', 'app.services', 'app.home']);

    app.config(['$routeProvider',function($routeProvider){

        $routeProvider

            .when('/', {
                templateUrl: '/src/client/app/home/homePage.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })

    }]);
})();