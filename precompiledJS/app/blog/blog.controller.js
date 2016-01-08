(function(){
	'use strict';

	angular
		.module('app.blog')
	    .controller('BlogController', BlogController);

	BlogController.$inject = ['BlogPostsService'];

    function BlogController(BlogPostsService){
    	var vm = this;
		vm.blogList;
		BlogPostsService.getBlogList()
			.then(data => vm.blogList = data);
    }

})();
