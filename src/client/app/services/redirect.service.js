'use strict';

(function () {
				'use strict';

				angular.module('app.services').service('RedirectService', RedirectService);

				RedirectService.$inject = [];

				function RedirectService() {
								return function (newLocation) {
												return window.location = newLocation;
								};
				}
})();