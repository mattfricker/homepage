(function(){
	'use strict';

	angular
		.module('app.home')
	    .controller('HomeController', HomeController);

	HomeController.$inject = [];

    function HomeController(){
    	var vm = this;
		vm.redirect = function redirect (newLocation) {
			window.location = newLocation;
		}
    }

})();
