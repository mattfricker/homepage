'use strict';

(function () {
	'use strict';

	angular.module('app.blog').controller('PostController', PostController);

	PostController.$inject = ['BlogPostsService', 'RedirectService'];

	function PostController(BlogPostsService, RedirectService) {
		var vm = this;
		vm.redirect = RedirectService;
		vm.post, vm.nonExistingPost;
		BlogPostsService.getBlogPost().then(function (data) {
			if (!!data[0]) {
				return vm.post = data[0];
			}
			return vm.nonexistingPost = true;
		});
	}
})();