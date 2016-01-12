(function(){
	'use strict';

	angular
		.module('app.blog')
	    .controller('BlogController', BlogController);

	BlogController.$inject = ['BlogPostsService', 'RedirectService'];

    function BlogController(BlogPostsService, RedirectService){
    	var vm = this;
		vm.redirect = RedirectService;
		vm.blogList;
		BlogPostsService.getBlogList()
			.then(data => vm.blogList = data);
    }

})();
