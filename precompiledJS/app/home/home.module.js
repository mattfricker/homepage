(function(){
	angular
		.module('app.home', [])
	    .directive('Placeholder', function(){
	        return {
	            templateUrl: '/src/client/app/home/placeholder.html',
	            replace: true
	        };
	    })
})();