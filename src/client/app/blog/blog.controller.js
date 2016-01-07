'use strict';

(function () {
	'use strict';

	angular.module('app.blog').controller('BlogController', BlogController);

	BlogController.$inject = ['BlogPostsService'];

	function BlogController(BlogPostsService) {
		var vm = this;
		vm.blogList;
		BlogPostsService.getBlogList().then(function (data) {
			return vm.blogList = data;
		});
	}
})();