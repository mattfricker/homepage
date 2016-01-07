'use strict';

(function () {
	'use strict';

	angular.module('app.blog').controller('BlogController', BlogController);

	BlogController.$inject = [];

	function BlogController() {
		var vm = this;
		vm.testString = "hello blog world.";
	}
})();