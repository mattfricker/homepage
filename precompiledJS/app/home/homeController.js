(function(){
	'use strict';

	angular
		.module('app.home')
	    .controller('HomeController', HomeController);

	HomeController.$inject = ['RedirectService'];

    function HomeController(RedirectService){
    	var vm = this;
		vm.redirect = RedirectService;
		vm.portfolio = [
			{
				title: 'Center for the Study of Targeted Killing',
				link: 'http://targetedkilling.org/#/',
				imageSrc: '/img/cstk.png',
				imageAlt: 'screenshot of CSTK homepage',
				tools: ['Angular', 'Express', 'Git', 'Sass', 'Gulp', 'Bower', 'Css', 'HTML', 'JavaScript', 'JSON', 'Babel', 'npm', 'Node', 'MySQL']
			}, 
			{
				title: 'My Homepage (version four)',
				link: '/#/',
				imageSrc: '/img/homepage.png',
				imageAlt: 'screenshot of the fourth version of my homepage',
				tools: ['Angular', 'Express', 'Git', 'Sass', 'Gulp', 'Bower', 'Css', 'HTML', 'JavaScript', 'JSON', 'Babel', 'npm', 'Node', 'Mongo']
			}
		];
    }

})();
