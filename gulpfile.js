var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
var gutil = require('gulp-util');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var path = require('path');
var wrap = require('gulp-wrap');
var babel = require("gulp-babel");
var minify = require('gulp-babel-minify');

gulp.task('autoprefixer', function() {
    gulp.src([
        'public/style/pages/*.css',
        'public/style/components/*.css',
        'public/style/vendor/*.css'
    ])
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
        .pipe(gulp.dest('prefixed'));
});

gulp.task('css', function() {
    gulp.src([
        'prefixed/*.css'
    ])
        .pipe(concat('main.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('public'));
});

gulp.task('wrap', function() {  
    gulp.src([
    ])
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(gulp.dest('wrapped'))
        .on('error', gutil.log);
});


gulp.task('compress', function() {

     gulp.src([
        'public/js/vendor/ng.min.js',
        'public/js/vendor/*.js',
        'public/app.js',
        'public/js/controllers/auth/*.js',
        'public/js/controllers/views/*.js',
        'public/js/derictives/*.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public'))
        .on('error', gutil.log);
});

gulp.task('templates', function() {
    gulp.src(['public/views/*.html'])
        .pipe(templateCache({ root: 'views', module: 'decode' }))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['templates']);