'use strict';

(function () {
	angular.module('app.home', []).directive('headerTileHolder', function () {
		return {
			templateUrl: '/src/client/app/home/headerTileHolder.html',
			replace: true
		};
	}).directive('aboutBox', function () {
		return {
			templateUrl: '/src/client/app/home/aboutBox.html',
			replace: true
		};
	}).directive('portfolioBox', function () {
		return {
			templateUrl: '/src/client/app/home/portfolioBox.html',
			replace: true
		};
	});
})();