(function(){
	'use strict';

	angular
		.module('app.blog')
	    .controller('PostController', PostController);

	PostController.$inject = ['BlogPostsService', 'RedirectService'];

    function PostController(BlogPostsService, RedirectService){
    	var vm = this;
		vm.redirect = RedirectService;
		vm.post;
		BlogPostsService.getBlogPost()
			.then(data => vm.post = data[0])
    }

})();
