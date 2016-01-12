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
			//REMOVE SUBSEQUENT THEN ONCE DATABASE STORES DATE FORMAT CORRECTLY
			.then(() => vm.post.date = new Date(vm.post.date))
    }

})();
