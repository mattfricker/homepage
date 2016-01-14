(function(){
    'use strict';

    angular
        .module('app.services')
        .service('PortfolioService', PortfolioService);
        
    PortfolioService.$inject = ['$http', '$routeParams'];

    function PortfolioService($http, $routeParams){
        let getPortfolio = function getPortfolio(){
            var urlToSend = '/portfolio';
            return $http.get(urlToSend).then(res => res.data.portfolio)
        };

        return {
            getPortfolio: getPortfolio
        };
        
        
    }

})();