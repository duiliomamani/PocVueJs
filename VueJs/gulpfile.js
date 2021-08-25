/// <binding AfterBuild='Production' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var javascriptObfuscator = require('gulp-javascript-obfuscator');

var pathBundle = ['wwwroot/js/bundle.js'];
var pathJs = ['wwwroot/scripts/Shared/*.js', 'wwwroot/scripts/*/*/*.js', 'wwwroot/scripts/*/*/*/*.js', 'wwwroot/scripts/*/*.js'];


gulp.task('bundle', function () {
    return gulp.src(pathJs)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('wwwroot/scripts'));
});

gulp.task('minify', function () {
    return gulp.src(pathBundle)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('wwwroot/scripts'));

});

gulp.task('obfuscate', function () {
    return gulp.src('wwwroot/scripts/bundle.min.js')
        .pipe(javascriptObfuscator({
            compact: true
        }))
        .pipe(gulp.dest('wwwroot/scripts'));
});
