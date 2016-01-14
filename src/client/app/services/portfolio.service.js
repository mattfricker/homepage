'use strict';

(function () {
    'use strict';

    angular.module('app.services').service('PortfolioService', PortfolioService);

    PortfolioService.$inject = ['$http', '$routeParams'];

    function PortfolioService($http, $routeParams) {
        var getPortfolio = function getPortfolio() {
            var urlToSend = '/portfolio';
            return $http.get(urlToSend).then(function (res) {
                return res.data.portfolio;
            });
        };

        return {
            getPortfolio: getPortfolio
        };
    }
})();