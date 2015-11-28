'use strict';

(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['HomePageService', 'StrikeInfoService'];

    function HomeController(HomePageService, StrikeInfoService) {
        var vm = this;
        vm.placeholder = [];

        var placeholderPromise = HomePageService.getRecentplaceholder();

        placeholderPromise.then(function (data) {
            vm.placeholder = data.data.placeholder;
        });
    }
})();