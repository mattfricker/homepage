(function(){
	'use strict';

	angular
		.module('app.home')
	    .controller('HomeController', HomeController);

	HomeController.$inject = ['PortfolioService', 'RedirectService'];

    function HomeController(PortfolioService, RedirectService){
    	var vm = this;
		vm.redirect = RedirectService;
		vm.portfolio;
		PortfolioService.getPortfolio()
			.then(data => vm.portfolio = data);
    }

})();
