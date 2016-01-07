module.exports = function(){
	var client = './src/client/';
	var build = './build/';
	var clientApp = client + 'app/';
	var temp = './tmp/'; //create a temp folder;
	var server = './';
	var config = {
		temp: temp,
		build: build,
		analytics: './analytics/analytics.js',
		fonts: './bower_components/font-awesome/fonts/**/*.*',
		html: clientApp + '**/*.html',
		htmlTemplates: clientApp + '**/*.html',
		images: './img/**/*.*',
		precompiledJS: './precompiledJS/**/*.js',
		alljs: [
			//all JS files to be examined by JSHint and JSCS
			'./src/**/*.js',
			'./*.js'
		],
		allSass: client + 'styles/**/*.scss',
		client: client,
		index: client + 'index.html',
		css: temp + 'stylesheet.css',
		server: server,
		js: [
			clientApp + '**/*.module.js',
			clientApp + '**/*.js',
			'!' + clientApp + '**/*.spec.js'
			],
		sassMain: client + 'styles/stylesheet.scss',
		
		//template cache
		templateCache: {
			file: 'templates.js',
			options: {
				module: 'app.services',
				standAlone: false,
				root: '/src/client/app/'
			}	
		},
		
		//browser sync
		browserReloadDelay: 1000,
		
		//bower and npm locations
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		},
		
		//Node settings
		defaultPort: 3030,
		devServer: './server.js',
		buildServer: './build/server.js'
		
	};

	config.getWiredepDefaultOptions = function(){
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		return options;
	};

	return config;
};