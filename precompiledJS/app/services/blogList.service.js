(function(){
    'use strict';

    angular
        .module('app.services')
        .service('BlogPostsService', BlogPostsService);
        
    BlogPostsService.$inject = ['$http', '$routeParams'];

    function BlogPostsService($http, $routeParams){
        let getBlogList = function getBlogList(){
            var urlToSend = '/blogList';
            return $http.get(urlToSend).then(res => res.data.posts)
        };
        let getBlogPost = function getBlogPost(currentId){
            var urlToSend = '/blogPost/' + $routeParams.postId;
            return $http.get(urlToSend).then(res => res.data.post)
        };

        return {
            getBlogList: getBlogList,
            getBlogPost: getBlogPost
        };
        
        
    }

})();
