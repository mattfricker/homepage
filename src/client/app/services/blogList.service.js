'use strict';

(function () {
    'use strict';

    angular.module('app.services').service('BlogPostsService', BlogPostsService);

    BlogPostsService.$inject = ['$http', '$routeParams'];

    function BlogPostsService($http, $routeParams) {
        var getBlogList = function getBlogList() {
            var urlToSend = '/blogList';
            return $http.get(urlToSend).then(function (res) {
                return res.data.posts;
            });
        };
        var getBlogPost = function getBlogPost(currentId) {
            var urlToSend = '/blogPost/' + $routeParams.postId;
            return $http.get(urlToSend).then(function (res) {
                return res.data.post;
            });
        };

        return {
            getBlogList: getBlogList,
            getBlogPost: getBlogPost
        };
    }
})();