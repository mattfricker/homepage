'use strict';

(function () {
	angular.module('app.blog', []).directive('blogSummary', function () {
		return {
			templateUrl: '/src/client/app/blog/blogSummary.html',
			scope: {
				blogPost: "="
			},
			replace: false
		};
	}).directive('blogTags', function () {
		return {
			templateUrl: '/src/client/app/blog/blogTags.html',
			scope: {
				tagArray: "="
			},
			replace: false
		};
	}).directive('fullBlogPost', function () {
		return {
			templateUrl: '/src/client/app/blog/fullBlogPost.html',
			scope: {
				currentPost: "="
			},
			replace: false
		};
	}).directive('blogHeader', function () {
		return {
			templateUrl: '/src/client/app/blog/blogHeader.html',
			replace: false
		};
	});
})();