"use strict";
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var wiredep = require('wiredep').stream;
var csswring = require('csswring');
var lost = require('lost');
var autoprefixer = require('autoprefixer-core');

var $ = require('gulp-load-plugins')({lazy: true});

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
gulp.task('styles', function(){
	var processors = [
		lost,
		autoprefixer({browsers:['last 2 version']})
	];
	log('compiling Sass to CSS');

	return gulp
		.src(config.sassMain)
		.pipe($.sass())
		.pipe($.postcss(processors))
		.pipe(gulp.dest(config.temp))


});

// gulp.task('clean-styles', function(done){
// 	var files = config.temp + '**/*.css';
// 	clean(files, done);
// });

gulp.task('sass-watch', function(){
	gulp.watch([config.allSass], ['styles']);
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

gulp.task('inject', ['wiredep', 'styles'], function(){ //calls wiredep and styles. Injects our css as well.
	log('Inject the custon css into the index');
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.client))
});

//////////
function clean(path, done){
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path, done);
}

function log(msg){
	if (typeof(msg) === 'object'){
		for (var item in msg){
			if (msg.hasOwnProperty(item)){
				$.util.log($.util.colors.blue(msg(item)));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}