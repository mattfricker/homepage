(function(){
	angular
		.module('app.blog', [])
	    .directive('blogSummary', function(){
	        return {
	            templateUrl: '/src/client/app/blog/blogSummary.html',
				scope: {
					blogPost: "="	
				},
	            replace: false
	        };
	    })
})();