module.exports = function(){
	var client = './src/client/';
	var clientApp = client + 'app/';
	var temp = './tmp/'; //create a temp folder
	var config = {
		temp: temp,
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
		js: [
			clientApp + '**/*.module.js',
			clientApp + '**/*.js',
			'!' + clientApp + '**/*.spec.js'
			],
		sassMain: client + 'styles/stylesheet.scss',

		//bower and npm locations
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		}
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