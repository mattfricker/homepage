(function(){
	'use strict';

	angular
		.module('app.home')
	    .controller('HomeController', HomeController);

	HomeController.$inject = [];

    function HomeController(){
    	var vm = this;
		vm.blogText = "Blog"
		vm.comingSoon = function comingSoon () {
			vm.blogText = "Coming soon";
		};
		vm.redirect = function redirect (newLocation) {
			window.location = newLocation;
		}
    }

})();
