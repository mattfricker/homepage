"use strict";
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var wiredep = require('wiredep').stream;
var port = process.env.PORT || config.defaultPort;

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', ['babel'], function(){
	log('Vetting code with JSCS and JSHint');

	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
		.pipe($.jshint.reporter('fail'))
});

gulp.task('babel', function(){
	return gulp.src(config.precompiledJS)
		.pipe($.babel({ optional: ['runtime'] }))
		.pipe(gulp.dest(config.client));
});


// gulp.task('styles', ['clean-styles'], function(){
gulp.task('styles', ['clean-styles'], function(){
	log('compiling Sass to CSS');

	return gulp
		.src(config.sassMain)
		.pipe($.plumber())
		.pipe($.sass())
		.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']})) // more than 5% of market
		.pipe(gulp.dest(config.temp))

});

gulp.task('fonts', ['clean-fonts'], function() {
	log('copying fonts');
	return gulp	
		.src(config.fonts)
		.pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
	log('copying and compressing images');
	return gulp	
		.src(config.images)
		.pipe($.imagemin({optimizationLevel: 4}))		
		.pipe(gulp.dest(config.build + 'img'));
});

// gulp.task('clean-styles', function(done){
// 	var files = config.temp + '**/*.css';
// 	clean(files, done);
// });

gulp.task('sass-watch', function(){
	gulp.watch([config.allSass], ['styles']);
});

gulp.task('templateCache', ['clean-code'], function(){
	log('Creating Angular %templateCache');
	return gulp
		 .src(config.htmlTemplates) 
		 .pipe($.minifyHtml({empty: true}))
		 .pipe($.angularTemplatecache(
			 config.templateCache.file,
			 config.templateCache.options
		 ))
		 .pipe(gulp.dest(config.temp))
});

gulp.task('babel-watch', function(){
	gulp.watch([config.precompiledJS], ['vet']);
});

gulp.task('wiredep', function(){
	log('Put the bower css and js, as well as custon app js files into the index');
	var options = config.getWiredepDefaultOptions();
	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client))
});

gulp.task('inject', ['babel', 'wiredep', 'styles', 'templateCache'], function(){ //calls wiredep and styles. Injects our css as well.
	log('Inject the custon css into the index');
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.client))
});

gulp.task('concat', ['inject'], function() {
	log('Optimizing css, html, and javascript');
	var templateCache = config.temp + config.templateCache.file;
	var options = {
		searchPath: './'
	};
	return gulp
		.src(config.index)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, {read: false}), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe($.useref(options))
		.pipe(gulp.dest(config.build));
});

gulp.task('minify-css', ['concat'], function() {
	return gulp
		.src(config.build + '**/*.css')
		.pipe($.csso())
		.pipe(gulp.dest(config.build))
});

gulp.task('minify-js', ['minify-css'], function() {
	return gulp
		.src(config.build + '**/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest(config.build))
});

gulp.task('minify', ['minify-js']);

gulp.task('serve-dev', ['inject'], function() {
	serve(true);
});

gulp.task('serve-build', ['build'], function() {
	serve(false);
});

gulp.task('inject-server', function() {
	log('injecting server into build folder');
	return gulp
		.src(config.devServer)
		.pipe(gulp.dest('./build'))
});

// gulp.task('inject-analytics', function() {
// 	log('injecting analytics into build folder');
// 	return gulp
// 		.src(config.analytics)
// 		.pipe(gulp.dest('./build/analytics'))
// });

gulp.task('build', ['babel', 'inject-server', 'images', 'minify']);
/* Cleaners */
gulp.task('clean', function(done) {
	var deleteConfig = [].concat(config.build, config.temp);
	log('Cleaning: ' + $.util.colors.yellow(deleteConfig));
	del(deleteConfig, done);
});

gulp.task('clean-fonts', function(done) {
	clean(config.build + 'fonts/**/*.*', done)
});

gulp.task('clean-styles', function(done) {
	clean(config.temp + '**/*.css', done)
});

gulp.task('clean-images', function(done) {
	clean(config.build + 'img/**/*.*', done)
});

gulp.task('clean-code', function(done) {
	var files = [].concat(
		config.temp + '**/*.js',
		config.build + '**/*.html',
		config.build + 'js/**/*.js'
	);
	clean(files, done)
});


//////////
function serve(isDev) {
	var nodeOptions = {
		script: isDev ? config.devServer : config.buildServer,
		delayTime: 1,
		env: {
			'PORT': port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch: [config.server]
	};
	
	return $.nodemon(nodeOptions)
		.on('start', function() {
			log('*** nodemon has started');
			startBrowserSync(isDev);
		})
		.on('restart', function(ev) {
			log('*** nodemon restarted');
			log('files changed on restart:\n' + ev);
			setTimeout(function() {
				browserSync.notify('reloading now ...');
				browserSync.reload({stream: false});
			}, config.browserReloadDelay);
		})
		.on('crash', function() {
			log('*** nodemon has crashed');
		})
		.on('exit', function() {
			log('***nodemon has been exited');
		})	
}

function changeEvent(event) {
	var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
	log('file ' + event.path.replace(srcPattern, '') + ' ' + event.type)
}

function startBrowserSync(isDev) {
	if (!!args.nosync || !!browserSync.active) {
		return;
	}
	
	log('Starting browser-sync on port ' + port);
	
	if (!!isDev){
		gulp.watch([config.allSass], ['babel', 'styles'])
			.on('change', function(event) {changeEvent(event); });
	} else {
		gulp.watch([config.allSass, config.js, config.html], ['optimize', browserSync.reload])
			.on('change', function(event) {changeEvent(event); });
	}
	
	var options = {
		proxy: 'localhost:' + port,
		port: 3000,
		files: isDev ? [
			config.client + '**/*.*',
			! + config.allSass, 
			config.temp + '**/*.css'
		] : [],
		ghostMode: {
			clicks: true,
			location: false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix: 'gulp-patterns',
		notify: true,
		reloadDelay: 1000
	}
	
	browserSync(options);
}

function clean(path, done){
	log('Cleaning: ' + $.util.colors.yellow(path));
	del(path, done);
}

function log(msg){
	if (typeof(msg) === 'object'){
		for (var item in msg){
			if (msg.hasOwnProperty(item)){
				$.util.log($.util.colors.yellow(msg(item)));
			}
		}
	} else {
		$.util.log($.util.colors.yellow(msg));
	}
}