/**
 * Created by laixiangran on 2017/5/7.
 * homepage：http://www.laixiangran.cn
 */

var gulp = require('gulp');
var os = require('os');
var path = require('path');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var inlineNg2Template = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');

var config = {
	src: './src',
	dest: './dist',
	aot: './aot'
};

gulp.task('clean:dist', function () {
	return del.sync(config.dest, config.aot);
});

gulp.task('copy:src', ['clean:dist'], function () {
	return gulp.src([config.src + '/**/*.*'])
		.pipe(gulpif(/.+\.scss/g, sass({outputStyle: 'compressed'}).on('error', sass.logError)))
		.pipe(rename(function (path) {
			if (path.extname === '.css') {
				path.extname = '.scss';
			}
		}))
		.pipe(gulp.dest(config.aot));
});

gulp.task('ng2:inline', ['copy:src'], function () {
	return gulp.src([config.aot + '/**/*.ts'])
		.pipe(inlineNg2Template({useRelativePaths: true, target: 'es5'}))
		.pipe(gulp.dest(config.aot + '/'));
});

gulp.task('prepublish', function (cb) {
	runSequence(['clean:dist', 'copy:src', 'ng2:inline'], cb);
});
