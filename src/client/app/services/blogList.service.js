'use strict';

(function () {
    'use strict';

    angular.module('app.services').service('BlogPostsService', BlogPostsService);

    BlogPostsService.$inject = ['$http'];

    function BlogPostsService($http) {
        var getBlogList = function getBlogList() {
            var urlToSend = '/blogList';
            return $http.get(urlToSend).then(function (res) {
                return res.data.posts;
            });
        };

        return {
            getBlogList: getBlogList
        };
    }
})();