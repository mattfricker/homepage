(function(){
    'use strict';

    angular
        .module('app.services')
        .service('SingleStrikeService', SingleStrikeService);
        
    SingleStrikeService.$inject = ['$http', '$routeParams'];

    function ProjectInfoService($http, $routeParams){
        let getProjects = function getStrike(){
            var urlToSend = '/getSingleStrike/' + $routeParams.sid;
            return $http.get(urlToSend).then((data) => data.data.strike);
        };

        return {
            getProjects: getProjects,
        };
        
        
    }

})();
