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

gulp.task('watch', function(){
	return gulp.watch('src/*.js', ['javascript']);
});

// refresh the server after changes
gulp.task('start', function () {
	nodemon({
		script: 'app.js'
	});
});

gulp.task('default', ['javascript', 'start', 'watch']);
