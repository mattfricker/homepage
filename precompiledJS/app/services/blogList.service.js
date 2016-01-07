(function(){
    'use strict';

    angular
        .module('app.services')
        .service('BlogPostsService', BlogPostsService);
        
    BlogPostsService.$inject = ['$http'];

    function BlogPostsService($http){
        let getBlogList = function getBlogList(){
            var urlToSend = '/blogList';
            return $http.get(urlToSend).then(res => res.data.posts)
        };

        return {
            getBlogList: getBlogList,
        };
        
        
    }

})();
