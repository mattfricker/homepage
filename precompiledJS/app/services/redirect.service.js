(function(){
    'use strict';

    angular
        .module('app.services')
        .service('RedirectService', RedirectService);
        
    RedirectService.$inject = [];

    function RedirectService(){
		return (newLocation) => window.location = newLocation;   
    }

})();
	
	
	
	
	
	
	
	
	
	
	
