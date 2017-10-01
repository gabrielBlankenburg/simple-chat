var gulp = require('gulp');
var minify = require('gulp-minify');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// compiles and minify the javascript
gulp.task('javascript', function(){
	return gulp.src('src/*.js')
			.pipe(browserify({ debug: true }))
			.pipe(minify())
			.pipe(gulp.dest('public/script'));
});

// refresh the browser after changes
gulp.task('refresh', function(){
	browserSync.init({
        poxy: 'localhost'
    });
	return gulp.watch(['public', 'public/script/*', 'public/style/*']).on('change', reload);
})

// refresh the server after changes
gulp.task('start', function () {
	nodemon({
		script: 'app.js'
	});
});

gulp.task('default', ['javascript', 'start'], function(){
	return gulp.watch('src/*.js', ['javascript']);
});
