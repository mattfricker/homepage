(function(){
	'use strict';

	angular
		.module('app.home')
	    .controller('HomeController', HomeController);

	HomeController.$inject = [];

    function HomeController(HomePageService, StrikeInfoService){
    	var vm = this;


    }

})();
