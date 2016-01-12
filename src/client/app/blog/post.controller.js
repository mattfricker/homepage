'use strict';

(function () {
	'use strict';

	angular.module('app.blog').controller('PostController', PostController);

	PostController.$inject = ['BlogPostsService', 'RedirectService'];

	function PostController(BlogPostsService, RedirectService) {
		var vm = this;
		vm.redirect = RedirectService;
		vm.post;
		BlogPostsService.getBlogPost().then(function (data) {
			return vm.post = data[0];
		})
		//REMOVE SUBSEQUENT THEN ONCE DATABASE STORES DATE FORMAT CORRECTLY
		.then(function () {
			return vm.post.date = new Date(vm.post.date);
		});
	}
})();