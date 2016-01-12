(function(){
	'use strict';

	angular
		.module('app.blog')
	    .controller('PostController', PostController);

	PostController.$inject = ['BlogPostsService'];

    function PostController(BlogPostsService){
    	var vm = this;
		vm.post;
		BlogPostsService.getBlogPost()
			.then(data => vm.post = data[0])
			.then(() => vm.post.date = new Date(vm.post.date))
    }

})();
